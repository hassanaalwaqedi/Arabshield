/**
 * Brand Constants - NovaArab
 * Central source of truth for all brand-related strings
 * Import these constants instead of hardcoding brand names
 */

export const BRAND = {
    // Primary brand name
    name: 'NovaArab',

    // Full company name
    fullName: 'NovaArab Technologies',

    // Tagline
    tagline: 'تمكين الشركات بحلول رقمية متطورة',
    taglineEn: 'Empowering businesses with cutting-edge digital solutions',

    // Domain
    domain: 'novaarab.com',

    // Email
    email: 'hello@novaarab.com',
    supportEmail: 'support@novaarab.com',

    // Social handles
    social: {
        twitter: '@NovaArab',
        linkedin: 'novaarab',
        instagram: 'novaarab',
        facebook: 'novaarab',
    },

    // Legal
    copyright: `© ${new Date().getFullYear()} NovaArab Technologies. جميع الحقوق محفوظة.`,
    copyrightEn: `© ${new Date().getFullYear()} NovaArab Technologies. All rights reserved.`,

    // Theme storage key
    themeStorageKey: 'novaarab-theme',
} as const;

// SEO metadata
export const SEO = {
    title: {
        default: 'NovaArab | تقنية المستقبل',
        template: '%s | NovaArab',
    },
    description: 'NovaArab توفر حلول تطوير الويب والتطبيقات والبرمجيات المخصصة للمؤسسات الحديثة.',
    descriptionEn: 'NovaArab provides top-tier web development, mobile apps, and custom software solutions for the modern enterprise.',
    keywords: [
        'Web Development',
        'App Development',
        'Software Company',
        'Saudi Arabia',
        'Tech Solutions',
        'NovaArab',
        'تطوير الويب',
        'تطوير التطبيقات',
    ],
} as const;
