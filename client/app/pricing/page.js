"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/payments/subscription-status', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (response.ok) setSubscription(data);
      })
      .catch(() => {});
  }, []);

  const startCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/signup');
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/payments/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: '{}' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to start checkout.');
      window.location.assign(data.url);
    } catch (err) { setError(err.message); setLoading(false); }
  };

  const openPlanManagement = async () => {
    const token = localStorage.getItem('token');
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/payments/create-portal-session', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: '{}' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to open plan management.');
      window.location.assign(data.url);
    } catch (err) { setError(err.message); setLoading(false); }
  };

  const hasActivePlan = subscription?.hasActivePlan;
  const renewalDate = subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : null;

  return <main className="min-h-screen bg-[#121212] px-6 py-16 text-white"><section className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-8"><p className="text-sm font-bold uppercase tracking-wider text-orange-400">Personalized fitness</p><h1 className="mt-3 text-4xl font-bold">{hasActivePlan ? 'Your plan is active' : 'Get your full plan'}</h1><p className="mt-4 text-white/70">{hasActivePlan ? `You already have access to your personalized plan.${renewalDate ? ` Your current period ends on ${renewalDate}.` : ''}` : 'Unlock your personalized workout and nutrition plan with a secure Stripe subscription.'}</p>{searchParams.get('canceled') && <p className="mt-4 rounded-lg bg-yellow-500/15 p-3 text-sm text-yellow-100">Checkout was cancelled. No payment was made.</p>}{error && <p className="mt-4 rounded-lg bg-red-500/20 p-3 text-sm text-red-100">{error}</p>}{hasActivePlan ? <button onClick={openPlanManagement} disabled={loading || !subscription?.canManagePlan} className="mt-8 w-full rounded-lg bg-orange-500 py-4 text-lg font-semibold disabled:opacity-60">{loading ? 'Opening plan settings...' : 'Manage / update plan'}</button> : <button onClick={startCheckout} disabled={loading} className="mt-8 w-full rounded-lg bg-orange-500 py-4 text-lg font-semibold disabled:opacity-60">{loading ? 'Opening secure checkout...' : 'Choose this plan'}</button>}</section></main>;
}
