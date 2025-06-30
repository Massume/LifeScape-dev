import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LifeScape',
  description: 'Life decisions visualized as a city',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav>
          <Link href="/">Home</Link> | <Link href="/login">Login</Link> |{' '}
          <Link href="/register">Register</Link> |{' '}
          <Link href="/profile">Profile</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
