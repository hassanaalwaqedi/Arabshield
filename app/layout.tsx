import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ClientProviders } from '@/components/ClientProviders';

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
    <html lang="ar" dir="rtl" className={inter.variable}>
      <body className="flex min-h-screen bg-abyss-950 font-sans text-slate-200 selection:bg-blue-500/30">
        <ClientProviders>
          {/* Sidebar */}
          <div className="flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col min-h-screen transition-all duration-300 md:mr-0 md:ml-[280px]">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
