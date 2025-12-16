'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { UserSettingsProvider } from '@/contexts/UserSettingsContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { WelcomeCard } from '@/components/WelcomeCard';
import { ChatWidget } from '@/components/ChatWidget';
import { DefaultStructuredData } from '@/components/StructuredData';

/**
 * Client-side providers wrapper
 * Wraps children with all required client-side context providers
 */
export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <SettingsProvider>
                <UserSettingsProvider>
                    <SidebarProvider>
                        <ToastProvider>
                            <ChatProvider>
                                <DefaultStructuredData />
                                {children}
                                <WelcomeCard />
                                <ChatWidget />
                            </ChatProvider>
                        </ToastProvider>
                    </SidebarProvider>
                </UserSettingsProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}


