'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * Theme Provider Component
 * Wraps the app with next-themes ThemeProvider for dark/light mode support
 * 
 * Features:
 * - Supports 'dark', 'light', and 'system' themes
 * - Uses 'class' attribute for Tailwind CSS dark mode
 * - Persists theme choice in localStorage
 * - Prevents flash on initial load
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="novaarab-theme"
        >
            {children}
        </NextThemesProvider>
    );
}
