'use client';

import { useState, useEffect } from 'react';
import BetCard from '@/components/dashboard/BetCard';

export default function Dashboard() {
  const [bets, setBets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchBets();
  }, []);

  const fetchBets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/bets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBets(data.bets || []);
    } catch (error) {
      console.error('Failed to fetch bets:', error);
    }
  };

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gold mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-400">
          WHERE FORTUNE MEETS GREATNESS
        </p>
      </div>

      {/* Account Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Account Balance</p>
          <p className="text-3xl font-bold text-gold">₦{user?.accountBalance?.toLocaleString() || '0'}</p>
        </div>
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Total Bets</p>
          <p className="text-3xl font-bold text-gold">{user?.totalBets || '0'}</p>
        </div>
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Total Winnings</p>
          <p className="text-3xl font-bold text-gold-light">₦{user?.totalWinnings?.toLocaleString() || '0'}</p>
        </div>
      </div>

      {/* Bet Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gold mb-6">AVAILABLE ODDS</h2>
        
        <div className="flex gap-4 mb-6 border-b border-gold/20 pb-4">
          {['all', 'rollover', '10+', '15+', 'correct_score'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 font-bold transition-all ${
                activeTab === tab
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-gold'
              }`}
            >
              {tab === 'all' ? 'All' : tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bets.length > 0 ? (
            bets.map((bet) => <BetCard key={bet._id} bet={bet} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 mb-4">No bets available at the moment</p>
              <p className="text-gray-500 text-sm">Check back later for exciting betting opportunities</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-gold text-darker font-bold rounded hover:bg-gold-light transition-all">
          DEPOSIT FUNDS
        </button>
        <button className="px-8 py-3 border border-gold text-gold font-bold rounded hover:bg-gold hover:text-darker transition-all">
          VIEW HISTORY
        </button>
      </div>
    </div>
  );
}
