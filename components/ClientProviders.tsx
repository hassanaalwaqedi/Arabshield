'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

/**
 * Client-side providers wrapper
 * Wraps children with all required client-side context providers
 */
export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
