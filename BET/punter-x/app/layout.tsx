'use client';

import { ReactNode } from 'react';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Punter X - WHERE FORTUNE MEETS GREATNESS</title>
        <meta name="description" content="Punter X: Sports Betting Tips, Strategy, Profits" />
      </head>
      <body>{children}</body>
    </html>
  );
}
