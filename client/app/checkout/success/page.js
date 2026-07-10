"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState('confirming');
  const [message, setMessage] = useState('Confirming your subscription…');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const token = localStorage.getItem('token');
    
    if (!sessionId || !token) { 
      setState('error'); 
      setMessage('Please sign in to confirm your subscription.'); 
      return; 
    }

    fetch('/api/payments/verify-checkout-session', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
      }, 
      body: JSON.stringify({ sessionId }) 
    })
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!response.ok || !data.paid) throw new Error(data.message || 'Your payment is still processing.');
        setState('success'); 
        setMessage('Your plan is active. You can start training now.');
      })
      .catch((error) => { 
        setState('error'); 
        setMessage(error.message || 'We could not confirm your payment.'); 
      });
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#121212] px-6 text-center text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-8">
        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold ${state === 'success' ? 'bg-green-500' : state === 'error' ? 'bg-red-500' : 'bg-orange-500'}`}>
          {state === 'success' ? '✓' : state === 'error' ? '!' : '…'}
        </div>
        <h1 className="mt-6 text-3xl font-bold">
          {state === 'success' ? 'Payment successful' : state === 'error' ? 'Payment confirmation needed' : 'One moment'}
        </h1>
        <p className="mt-3 text-white/70">{message}</p>
        <button onClick={() => router.push('/')} className="mt-8 w-full rounded-lg bg-orange-500 py-3 font-semibold">
          Go to home
        </button>
      </section>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center bg-[#121212] px-6 text-center text-white">
        <p className="text-white/70">Loading checkout details...</p>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}