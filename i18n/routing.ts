import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Supported locales
export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'ar';

// Locale configuration
export const localeConfig = {
    ar: {
        name: 'العربية',
        dir: 'rtl' as const,
        flag: '🇸🇦',
    },
    en: {
        name: 'English',
        dir: 'ltr' as const,
        flag: '🇺🇸',
    },
} as const;

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: 'as-needed', // Only show locale prefix for non-default
});

// Create lightweight wrappers around Next.js navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
