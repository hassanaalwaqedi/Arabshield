'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { routing, localeConfig, type Locale } from '@/i18n/routing';

interface LanguageSwitcherProps {
    compact?: boolean;
    showLabel?: boolean;
}

export function LanguageSwitcher({ compact = false, showLabel = true }: LanguageSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLocale = (newLocale: Locale) => {
        // Remove current locale prefix if present
        let newPath = pathname;

        // Check if pathname starts with a locale
        const pathnameHasLocale = routing.locales.some(
            (loc: Locale) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
        );

        if (pathnameHasLocale) {
            // Remove the current locale prefix
            const segments = pathname.split('/');
            segments.splice(1, 1); // Remove the locale segment
            newPath = segments.join('/') || '/';
        }

        // Add new locale prefix (for non-default locale)
        if (newLocale !== 'ar') {
            newPath = `/${newLocale}${newPath}`;
        }

        // Save preference
        localStorage.setItem('preferred-locale', newLocale);

        router.push(newPath);
        setIsOpen(false);
    };

    const currentConfig = localeConfig[currentLocale];

    if (compact) {
        return (
            <button
                onClick={() => switchLocale(currentLocale === 'ar' ? 'en' : 'ar')}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 hover:bg-slate-700/50 border border-border/50 hover:border-electric-500/30 transition-all duration-200"
                title={currentLocale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
                <span className="text-sm font-medium text-foreground">
                    {currentLocale === 'ar' ? 'EN' : 'AR'}
                </span>
            </button>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl
                    bg-muted/50 hover:bg-slate-700/50
                    border border-border/50 hover:border-electric-500/30
                    transition-all duration-200
                    ${showLabel ? 'min-w-[120px]' : ''}
                `}
            >
                <Globe className="w-4 h-4 text-electric-400" />
                {showLabel && (
                    <span className="text-sm font-medium text-foreground">
                        {currentConfig.name}
                    </span>
                )}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 end-0 w-40 py-2 bg-muted border border-border rounded-xl shadow-xl z-50">
                    {routing.locales.map((locale: Locale) => {
                        const config = localeConfig[locale];
                        const isActive = locale === currentLocale;

                        return (
                            <button
                                key={locale}
                                onClick={() => switchLocale(locale)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-2.5
                                    transition-colors duration-150
                                    ${isActive
                                        ? 'bg-electric-500/20 text-electric-400'
                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-foreground'
                                    }
                                `}
                            >
                                <span className="text-lg">{config.flag}</span>
                                <span className="text-sm font-medium">{config.name}</span>
                                {isActive && (
                                    <span className="ms-auto text-xs text-electric-400">✓</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// Simple toggle version for compact spaces
export function SimpleLanguageToggle() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;

    const toggleLocale = () => {
        const newLocale = currentLocale === 'ar' ? 'en' : 'ar';

        let newPath = pathname;
        const pathnameHasLocale = routing.locales.some(
            (loc: Locale) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
        );

        if (pathnameHasLocale) {
            const segments = pathname.split('/');
            segments.splice(1, 1);
            newPath = segments.join('/') || '/';
        }

        if (newLocale !== 'ar') {
            newPath = `/${newLocale}${newPath}`;
        }

        localStorage.setItem('preferred-locale', newLocale);
        router.push(newPath);
    };

    return (
        <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-muted hover:bg-accent border border-border text-sm font-medium text-foreground transition-colors"
            title={currentLocale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
        >
            <Globe className="w-3.5 h-3.5" />
            <span>{currentLocale === 'ar' ? 'EN' : 'AR'}</span>
        </button>
    );
}
