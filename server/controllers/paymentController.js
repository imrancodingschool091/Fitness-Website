import crypto from 'crypto';
import User from '../models/User.js';

const STRIPE_API = 'https://api.stripe.com/v1';

const stripeRequest = async (path, options = {}) => {
  const response = await fetch(`${STRIPE_API}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Stripe request failed');
  return data;
};

const updateUserFromSubscription = async ({ userId, customerId, subscription }) => {
  const update = { subscriptionStatus: subscription?.status || 'active' };
  if (customerId) update.stripeCustomerId = customerId;
  if (subscription?.id) update.stripeSubscriptionId = subscription.id;
  if (subscription?.current_period_end) update.subscriptionCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
  if (userId) await User.findByIdAndUpdate(userId, update);
  else if (subscription?.id || customerId) await User.findOneAndUpdate({ $or: [{ stripeSubscriptionId: subscription?.id }, { stripeCustomerId: customerId }] }, update);
};

const getSiteUrl = (req) => process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`;

export const createCheckoutSession = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) return res.status(503).json({ message: 'Payments are not configured yet.' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const form = new URLSearchParams({
      mode: 'subscription',
      'line_items[0][price]': process.env.STRIPE_PRICE_ID,
      'line_items[0][quantity]': '1',
      success_url: `${getSiteUrl(req)}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getSiteUrl(req)}/pricing?canceled=true`,
      'metadata[userId]': user.id,
      'subscription_data[metadata][userId]': user.id,
      customer_email: user.email,
    });
    if (user.stripeCustomerId) {
      form.delete('customer_email');
      form.set('customer', user.stripeCustomerId);
    }

    const session = await stripeRequest('/checkout/sessions', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString() });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Create checkout session error:', error.message);
    res.status(502).json({ message: 'Stripe checkout error: ' + error.message });
  }
};

export const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId?.startsWith('cs_')) return res.status(400).json({ message: 'Invalid checkout session' });
    const session = await stripeRequest(`/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=subscription`);
    if (session.metadata?.userId !== req.userId) return res.status(403).json({ message: 'This checkout session belongs to another user.' });
    const subscription = typeof session.subscription === 'object' ? session.subscription : null;
    if (session.payment_status === 'paid' && subscription) await updateUserFromSubscription({ userId: req.userId, customerId: session.customer, subscription });
    res.status(200).json({ paid: session.payment_status === 'paid', subscriptionStatus: subscription?.status || 'incomplete' });
  } catch (error) {
    console.error('Verify checkout session error:', error.message);
    res.status(500).json({ message: 'Unable to confirm checkout.' });
  }
};

export const getSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('subscriptionStatus subscriptionCurrentPeriodEnd stripeCustomerId');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hasActivePlan = ['active', 'trialing'].includes(user.subscriptionStatus);
    return res.status(200).json({
      hasActivePlan,
      subscriptionStatus: user.subscriptionStatus,
      currentPeriodEnd: user.subscriptionCurrentPeriodEnd,
      canManagePlan: hasActivePlan && Boolean(user.stripeCustomerId),
    });
  } catch (error) {
    console.error('Get subscription status error:', error.message);
    return res.status(500).json({ message: 'Unable to load subscription status.' });
  }
};
export const createPortalSession = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user?.stripeCustomerId) return res.status(400).json({ message: 'No Stripe subscription was found for this account.' });
    const form = new URLSearchParams({ customer: user.stripeCustomerId, return_url: `${getSiteUrl(req)}/` });
    const session = await stripeRequest('/billing_portal/sessions', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString() });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Create billing portal error:', error.message);
    res.status(500).json({ message: 'Unable to open subscription management.' });
  }
};

export const stripeWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !signature) return res.status(400).send('Missing webhook signature');
  const timestamp = signature.split(',').find((part) => part.startsWith('t='))?.slice(2);
  const receivedSignature = signature.split(',').find((part) => part.startsWith('v1='))?.slice(3);
  const expectedSignature = crypto.createHmac('sha256', secret).update(`${timestamp}.${req.body.toString('utf8')}`).digest('hex');
  if (!timestamp || !receivedSignature || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300 || !crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(receivedSignature))) return res.status(400).send('Invalid webhook signature');

  try {
    const event = JSON.parse(req.body.toString('utf8'));
    const object = event.data.object;
    if (event.type === 'checkout.session.completed') {
      const subscription = await stripeRequest(`/subscriptions/${object.subscription}`);
      await updateUserFromSubscription({ userId: object.metadata?.userId, customerId: object.customer, subscription });
    } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      await updateUserFromSubscription({ customerId: object.customer, subscription: object });
    } else if (event.type === 'invoice.payment_failed') {
      await User.findOneAndUpdate({ stripeCustomerId: object.customer }, { subscriptionStatus: 'past_due' });
    }
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error.message);
    res.status(500).send('Webhook processing failed');
  }
};




