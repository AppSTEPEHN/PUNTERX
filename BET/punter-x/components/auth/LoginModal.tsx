'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginModal({ onClose, onSwitchToSignup }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark border border-gold/30 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gold">LOGIN</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gold text-2xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-darker border border-gold/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-darker border border-gold/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-darker font-bold py-2 rounded hover:bg-gold-light transition-all disabled:opacity-50"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-gold hover:text-gold-light font-bold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
