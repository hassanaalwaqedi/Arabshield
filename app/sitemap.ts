import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Use environment variable or default to Vercel domain
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaarab.vercel.app';

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/pricing',
        '/contact',
        '/careers',
        '/portfolio',
        '/partners',
        '/support',
        '/faq',
        '/blog',
        '/case-studies',
        '/marketplace',
        '/privacy-policy',
        '/terms',
        '/login',
        '/register',
        '/docs',
        '/tutorials',
        '/ai-solutions',
        '/ai-docs',
        '/order',
    ];

    // Generate sitemap entries for both locales
    const locales = ['ar', 'en'];
    const entries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            const localePath = locale === 'ar' ? route : `/en${route}`;
            entries.push({
                url: `${baseUrl}${localePath}`,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : route === '/services' || route === '/pricing' ? 0.9 : 0.7,
                alternates: {
                    languages: {
                        'ar': `${baseUrl}${route}`,
                        'en': `${baseUrl}/en${route}`,
                    },
                },
            });
        });
    });

    return entries;
}
