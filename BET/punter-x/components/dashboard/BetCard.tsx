'use client';

import { useState } from 'react';
import BetModal from './BetModal';

export default function BetCard({ bet }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-dark border border-gold/30 rounded-lg p-6 hover:border-gold transition-all cursor-pointer"
           onClick={() => setShowModal(true)}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-gold font-bold text-lg flex-1">{bet.title}</h3>
          <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded">
            {bet.category.toUpperCase()}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">{bet.sport?.toUpperCase()}</p>
          {bet.matchDetails && (
            <p className="text-white font-semibold">
              {bet.matchDetails.home} vs {bet.matchDetails.away}
            </p>
          )}
          {bet.matchDetails?.league && (
            <p className="text-gray-500 text-sm">{bet.matchDetails.league}</p>
          )}
        </div>

        <div className="border-t border-gold/20 pt-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Odds:</span>
            <span className="text-gold font-bold text-xl">{bet.odds}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Min Stake:</span>
            <span className="text-white">₦{bet.minStake?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Max Stake:</span>
            <span className="text-white">₦{bet.maxStake?.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full bg-gold text-darker font-bold py-2 rounded hover:bg-gold-light transition-all">
          PLACE BET
        </button>
      </div>

      {showModal && (
        <BetModal bet={bet} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
