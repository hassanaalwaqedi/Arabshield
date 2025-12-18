import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ClientProviders } from '@/components/ClientProviders';
import { MainContent } from '@/components/MainContent';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'NovaArab | تقنية المستقبل',
    template: '%s | NovaArab',
  },
  description: 'NovaArab توفر حلول تطوير الويب والتطبيقات والبرمجيات المخصصة للمؤسسات الحديثة.',
  keywords: ['Web Development', 'App Development', 'Software Company', 'Saudi Arabia', 'Tech Solutions', 'NovaArab', 'تطوير الويب'],
  authors: [{ name: 'NovaArab Team' }],
  verification: {
    google: 'yqrR58XbsqkXoPAQKIr2G61ep3-Hri3HKLYcp9kWyJo',
  },
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
    <html lang="ar" dir="rtl" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30">
        <ClientProviders>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area - adjusts based on sidebar state */}
          <MainContent>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </MainContent>
        </ClientProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
