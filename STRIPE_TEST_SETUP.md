# Stripe test-mode setup

1. In Stripe Dashboard test mode, create a Product and a recurring monthly Price. Copy its price ID.
2. Copy server/.env.example values into server/.env, preserving your Mongo settings. Set JWT_SECRET, CLIENT_URL=http://localhost:3000, STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and STRIPE_WEBHOOK_SECRET.
3. Configure the Stripe customer portal in the Stripe Dashboard, so customers can manage or cancel subscriptions.
4. For local webhook testing, run: stripe listen --forward-to localhost:5000/api/payments/webhook. Copy the displayed webhook secret into STRIPE_WEBHOOK_SECRET.
5. Start the server and client. Create an account, select the plan, and use Stripe test card 4242 4242 4242 4242 with any future expiry date, CVC, and postal code.

The server keeps the Stripe secret key private. Only the Stripe-hosted Checkout URL is returned to the browser.
