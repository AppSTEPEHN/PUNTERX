'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <main className="min-h-screen bg-darker">
      <HeroSection />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-darker/95 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-gold font-bold text-2xl">PUNTER X</div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-darker transition-all"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="px-6 py-2 bg-gold text-darker font-bold hover:bg-gold-light transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Featured Odds Preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-gold">TODAY'S</span> TOP ODDS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Rollover', '10+ Odds', '15+ Odds', 'Correct Score'].map((category, idx) => (
            <div
              key={idx}
              className="bg-dark border border-gold/30 p-6 rounded-lg hover:border-gold transition-all cursor-pointer"
            >
              <h3 className="text-gold text-xl font-bold mb-4">{category}</h3>
              <p className="text-gray-400 text-sm">Login to view and place bets</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </main>
  );
}
