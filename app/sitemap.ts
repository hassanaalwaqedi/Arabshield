import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://NovaArab.vercel.app';

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
        '/issues',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : route === '/services' || route === '/pricing' ? 0.9 : 0.7,
    }));
}
