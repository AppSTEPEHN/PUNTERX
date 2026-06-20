'use client';

import { useRouter } from 'next/navigation';

export default function Header({ user }: any) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className="bg-dark border-b border-gold/20 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gold">PUNTER X</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-gold font-bold">{user?.firstName} {user?.lastName}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 border border-gold/30 text-gold rounded hover:bg-gold/10 transition-all"
        >
          LOGOUT
        </button>
      </div>
    </header>
  );
}
