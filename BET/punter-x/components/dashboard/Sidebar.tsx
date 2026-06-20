'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-dark border-r border-gold/20 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-gold font-bold text-xl">MENU</h2>
      </div>

      <nav className="space-y-4 flex-1">
        <Link
          href="/dashboard"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/dashboard')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          href="/dashboard/bets"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/dashboard/bets')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          🎯 My Bets
        </Link>

        <Link
          href="/dashboard/wallet"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/dashboard/wallet')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          💳 Wallet
        </Link>

        <Link
          href="/dashboard/history"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/dashboard/history')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          📜 History
        </Link>

        <Link
          href="/dashboard/profile"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/dashboard/profile')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          👤 Profile
        </Link>
      </nav>

      <div className="border-t border-gold/20 pt-4">
        <p className="text-gold text-xs font-bold mb-2">PUNTER X v1.0</p>
        <p className="text-gray-500 text-xs">
          WHERE FORTUNE MEETS GREATNESS
        </p>
      </div>
    </aside>
  );
}
