'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { UserSettingsProvider } from '@/contexts/UserSettingsContext';

/**
 * Client-side providers wrapper
 * Wraps children with all required client-side context providers
 */
export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <SettingsProvider>
                <UserSettingsProvider>
                    {children}
                </UserSettingsProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}
