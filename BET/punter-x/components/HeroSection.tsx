'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
    const timer = setTimeout(() => setShowSubtitle(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-darker via-dark to-darker flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Main Title */}
        <div className={`mb-8 transition-all duration-1000 ${showTitle ? 'animate-title' : 'opacity-0'}`}>
          <h1 className="text-7xl md:text-8xl font-black tracking-wider mb-4">
            <span className="text-gold drop-shadow-2xl" style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.8)' }}>
              PUNTER X
            </span>
          </h1>
        </div>

        {/* Subtitle/Motto */}
        <div className={`transition-all duration-1000 ${showSubtitle ? 'animate-subtitle' : 'opacity-0'}`}>
          <p className="text-2xl md:text-3xl font-light tracking-widest text-gold-light mb-12">
            WHERE FORTUNE MEETS GREATNESS
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Tips. Strategy. Profits. Join thousands of successful bettors on Africa's most trusted betting platform.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="px-8 py-4 bg-gold text-darker font-bold text-lg rounded hover:bg-gold-light transition-all transform hover:scale-105">
            START BETTING NOW
          </button>
          <button className="px-8 py-4 border-2 border-gold text-gold font-bold text-lg rounded hover:bg-gold hover:text-darker transition-all">
            LEARN MORE
          </button>
        </div>

        {/* Sports Icons */}
        <div className="mt-16 flex justify-center gap-8 text-gold/50">
          <span className="text-4xl">⚽</span>
          <span className="text-4xl">🏀</span>
          <span className="text-4xl">🏈</span>
          <span className="text-4xl">⚾</span>
          <span className="text-4xl">🎾</span>
        </div>
      </div>
    </div>
  );
}
