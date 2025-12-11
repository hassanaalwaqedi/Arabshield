import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'ArabShield | NovaArabia Technology',
    template: '%s | ArabShield',
  },
  description: 'NovaArabia provides top-tier web development, mobile apps, and custom software solutions for the modern enterprise.',
  keywords: ['Web Development', 'App Development', 'Software Company', 'Saudi Arabia', 'Tech Solutions', 'ArabShield', 'NovaArabia'],
  authors: [{ name: 'NovaArabia Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-abyss-950">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
