'use client';

import { useState } from 'react';

export default function BetModal({ bet, onClose }: any) {
  const [stake, setStake] = useState(bet.minStake);
  const [loading, setLoading] = useState(false);

  const potentialWinnings = stake * bet.odds;

  const handlePlaceBet = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch('/api/bets/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          betOddId: bet._id,
          stake,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to place bet');
      }

      const data = await res.json();
      const ticketId = data.ticket?._id;
      const paymentResponse = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketId }),
      });

      if (!paymentResponse.ok) {
        const paymentError = await paymentResponse.json();
        throw new Error(paymentError.message || 'Payment initialization failed');
      }

      const paymentData = await paymentResponse.json();

      if (!paymentData.authorizationUrl) {
        throw new Error('Payment URL not returned');
      }

      window.location.href = paymentData.authorizationUrl;
    } catch (error) {
      alert('Error placing bet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark border border-gold/30 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gold">PLACE BET</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gold text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="bg-dark border border-gold/20 p-4 rounded mb-6">
          <h3 className="text-gold font-bold mb-2">{bet.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{bet.matchDetails?.home} vs {bet.matchDetails?.away}</p>
          <p className="text-gold font-bold text-lg">Odds: {bet.odds}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gold mb-2">
              Stake Amount
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(Math.max(bet.minStake, Number(e.target.value)))}
                min={bet.minStake}
                max={bet.maxStake}
                className="flex-1 bg-darker border border-gold/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
              />
              <span className="text-gold font-bold">₦</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Min: ₦{bet.minStake?.toLocaleString()} | Max: ₦{bet.maxStake?.toLocaleString()}
            </p>
          </div>

          <div className="border-t border-gold/20 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Potential Winnings:</span>
              <span className="text-gold font-bold">₦{potentialWinnings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Your Stake:</span>
              <span className="text-white font-bold">₦{stake.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceBet}
            disabled={loading}
            className="w-full bg-gold text-darker font-bold py-2 rounded hover:bg-gold-light transition-all disabled:opacity-50 mt-6"
          >
            {loading ? 'PLACING BET...' : 'PLACE BET & PAY'}
          </button>
        </div>
      </div>
    </div>
  );
}
