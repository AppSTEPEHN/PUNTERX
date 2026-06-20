'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBets: 0,
    totalWinnings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data.stats || {});
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">
          Platform Management & Analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-gold">
            {loading ? '...' : stats.totalUsers}
          </p>
        </div>
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Total Bets Placed</p>
          <p className="text-3xl font-bold text-gold">
            {loading ? '...' : stats.totalBets}
          </p>
        </div>
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Total Winnings Paid</p>
          <p className="text-3xl font-bold text-gold-light">
            ₦{loading ? '...' : stats.totalWinnings?.toLocaleString()}
          </p>
        </div>
        <div className="bg-dark border border-gold/30 p-6 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-gold">
            ₦{loading ? '...' : stats.totalRevenue?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark border border-gold/30 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gold mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-6 py-3 bg-gold text-darker font-bold rounded hover:bg-gold-light transition-all">
            ADD NEW BET ODD
          </button>
          <button className="px-6 py-3 bg-gold/20 text-gold font-bold rounded hover:bg-gold/30 transition-all">
            MANAGE USERS
          </button>
          <button className="px-6 py-3 bg-gold/20 text-gold font-bold rounded hover:bg-gold/30 transition-all">
            VIEW TRANSACTIONS
          </button>
        </div>
      </div>
    </div>
  );
}
