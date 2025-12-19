import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClientProviders } from '@/components/ClientProviders';
import { MainContent } from '@/components/MainContent';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, localeConfig, type Locale } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Generate static params for all locales
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Generate metadata per locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const isArabic = locale === 'ar';
    const siteUrl = 'https://arabshield.vercel.app';

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: isArabic ? 'NovaArab | تقنية المستقبل' : 'NovaArab | Future Technology',
            template: '%s | NovaArab',
        },
        description: isArabic
            ? 'NovaArab توفر حلول تطوير الويب والتطبيقات والبرمجيات المخصصة للمؤسسات الحديثة.'
            : 'NovaArab provides top-tier web development, mobile apps, and custom software solutions for the modern enterprise.',
        keywords: isArabic
            ? ['تطوير الويب', 'تطوير التطبيقات', 'شركة برمجيات', 'السعودية', 'حلول تقنية', 'NovaArab']
            : ['Web Development', 'App Development', 'Software Company', 'Saudi Arabia', 'Tech Solutions', 'NovaArab'],
        authors: [{ name: 'NovaArab Team' }],
        icons: {
            icon: [
                { url: '/favicon.ico', sizes: 'any' },
                { url: '/icon.png', type: 'image/png', sizes: '512x512' },
            ],
            shortcut: '/favicon.ico',
            apple: '/icon.png',
        },
        openGraph: {
            type: 'website',
            siteName: 'NovaArab',
            title: isArabic ? 'NovaArab | تقنية المستقبل' : 'NovaArab | Future Technology',
            description: isArabic
                ? 'NovaArab توفر حلول تطوير الويب والتطبيقات والبرمجيات المخصصة للمؤسسات الحديثة.'
                : 'NovaArab provides top-tier web development, mobile apps, and custom software solutions for the modern enterprise.',
            url: siteUrl,
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'NovaArab',
                },
            ],
            locale: locale === 'ar' ? 'ar_SA' : locale === 'tr' ? 'tr_TR' : 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: isArabic ? 'NovaArab | تقنية المستقبل' : 'NovaArab | Future Technology',
            description: isArabic
                ? 'NovaArab توفر حلول تطوير الويب والتطبيقات والبرمجيات المخصصة للمؤسسات الحديثة.'
                : 'NovaArab provides top-tier web development, mobile apps, and custom software solutions for the modern enterprise.',
            images: ['/og-image.png'],
        },
        alternates: {
            languages: {
                'ar': '/',
                'en': '/en',
            },
        },
        verification: {
            google: 'yqrR58XbsqkXoPAQKIr2G61ep3-Hri3HKLYcp9kWyJo',
        },
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the current locale
    const messages = await getMessages();

    // Get direction based on locale
    const config = localeConfig[locale as Locale];
    const dir = config?.dir || 'rtl';

    return (
        <html lang={locale} dir={dir} className={inter.variable} suppressHydrationWarning>
            <body className="flex min-h-screen bg-background font-sans text-foreground selection:bg-blue-500/30">
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ClientProviders>
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content Area - adjusts based on sidebar state */}
                        <MainContent>
                            <Header />
                            <main className="flex-grow">
                                {children}
                            </main>
                            <Footer />
                        </MainContent>
                    </ClientProviders>
                </NextIntlClientProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
