'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState('Verifying payment...');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus('No payment reference provided.');
        return;
      }

      try {
        const res = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Verification failed');
          setStatus('Payment verification failed');
          return;
        }

        setStatus('Payment verified successfully!');
      } catch (err: any) {
        setError(err.message || 'Verification error');
        setStatus('Payment verification failed');
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <main className="min-h-screen bg-darker flex items-center justify-center p-6">
      <div className="bg-dark border border-gold/20 rounded-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gold mb-4">{status}</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <p className="text-gray-300 mb-6">
          If your payment was successful, your bet will be processed automatically.
        </p>
        <button
          className="px-6 py-3 bg-gold text-darker rounded font-bold hover:bg-gold-light transition"
          onClick={() => router.push('/')}
        >
          Return Home
        </button>
      </div>
    </main>
  );
}
