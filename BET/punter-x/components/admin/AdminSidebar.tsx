'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-dark border-r border-gold/20 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-gold font-bold text-xl">ADMIN PANEL</h2>
        <p className="text-gray-500 text-xs">v1.0</p>
      </div>

      <nav className="space-y-4 flex-1">
        <Link
          href="/admin"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/admin')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          href="/admin/odds"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/admin/odds')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          🎯 Manage Odds
        </Link>

        <Link
          href="/admin/users"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/admin/users')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          👥 Users
        </Link>

        <Link
          href="/admin/transactions"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/admin/transactions')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          💳 Transactions
        </Link>

        <Link
          href="/admin/settings"
          className={`block px-4 py-2 rounded transition-all ${
            isActive('/admin/settings')
              ? 'bg-gold/20 text-gold border-l-2 border-gold'
              : 'text-gray-400 hover:text-gold'
          }`}
        >
          ⚙️ Settings
        </Link>
      </nav>

      <div className="border-t border-gold/20 pt-4">
        <p className="text-gold text-xs font-bold mb-2">PUNTER X ADMIN</p>
        <p className="text-gray-500 text-xs">
          WHERE FORTUNE MEETS GREATNESS
        </p>
      </div>
    </aside>
  );
}
