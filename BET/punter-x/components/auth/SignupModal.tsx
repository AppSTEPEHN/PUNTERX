'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupModal({ onClose, onSwitchToLogin }: any) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Signup failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark border border-gold/30 rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gold">SIGN UP</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gold text-2xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gold mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-darker border border-gold/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gold mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-darker border border-gold/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-darker border border-gold/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gold mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-darker border border-gold/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-darker border border-gold/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-darker border border-gold/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-darker font-bold py-2 rounded hover:bg-gold-light transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-gold hover:text-gold-light font-bold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
