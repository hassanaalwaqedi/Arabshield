'use client';

import Script from 'next/script';

interface StructuredDataProps {
    type: 'Organization' | 'Website' | 'Service' | 'Article';
    data?: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
    const baseUrl = 'https://NovaArab.vercel.app';

    const schemas = {
        Organization: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'NovaArab',
            alternateName: 'NovaArab Technologies',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            description: 'شريكك التقني الموثوق. تطوير مواقع، تطبيقات، أمن سيبراني، وذكاء اصطناعي.',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Istanbul',
                addressCountry: 'Turkey',
            },
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+90-537-280-7133',
                contactType: 'customer service',
                availableLanguage: ['Arabic', 'English', 'Turkish'],
            },
            sameAs: [
                'https://twitter.com/NovaArab',
                'https://linkedin.com/company/NovaArab',
                'https://facebook.com/NovaArab',
            ],
        },
        Website: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'NovaArab',
            url: baseUrl,
            potentialAction: {
                '@type': 'SearchAction',
                target: `${baseUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
            },
        },
        Service: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            provider: {
                '@type': 'Organization',
                name: 'NovaArab',
            },
            serviceType: 'Software Development',
            areaServed: ['Turkey', 'Saudi Arabia', 'UAE', 'Middle East'],
            availableChannel: {
                '@type': 'ServiceChannel',
                serviceUrl: baseUrl,
            },
            ...data,
        },
        Article: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            publisher: {
                '@type': 'Organization',
                name: 'NovaArab',
                logo: {
                    '@type': 'ImageObject',
                    url: `${baseUrl}/logo.png`,
                },
            },
            ...data,
        },
    };

    const schema = schemas[type];

    return (
        <Script
            id={`structured-data-${type}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Default organization and website schema for layout
export function DefaultStructuredData() {
    return (
        <>
            <StructuredData type="Organization" />
            <StructuredData type="Website" />
        </>
    );
}
