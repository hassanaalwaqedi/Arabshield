'use client';

/**
 * Settings Context
 * Global real-time system settings from Firestore
 * Used to enforce settings across the entire application
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { SystemSettings, DEFAULT_SYSTEM_SETTINGS, isAdminRole } from '@/lib/admin';
import { useAuth } from '@/contexts/AuthContext';

interface SettingsContextType {
    settings: SystemSettings;
    loading: boolean;
    error: string | null;
    updateSetting: <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => Promise<void>;
    updateSettings: (updates: Partial<SystemSettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const { user, role } = useAuth();
    const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Real-time listener for system settings
    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'system', 'settings'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data() as SystemSettings;
                    setSettings({
                        ...DEFAULT_SYSTEM_SETTINGS,
                        ...data
                    });
                } else {
                    setSettings(DEFAULT_SYSTEM_SETTINGS);
                }
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error('Error fetching system settings:', err);
                setError('فشل في تحميل إعدادات النظام');
                setSettings(DEFAULT_SYSTEM_SETTINGS);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    // Update a single setting (admin only)
    const updateSetting = async <K extends keyof SystemSettings>(
        key: K,
        value: SystemSettings[K]
    ): Promise<void> => {
        if (!user || !isAdminRole(role)) {
            throw new Error('غير مصرح لك بتعديل الإعدادات');
        }

        const previousValue = settings[key];

        try {
            await setDoc(doc(db, 'system', 'settings'), {
                [key]: value,
                updatedAt: serverTimestamp(),
                updatedBy: user.uid
            }, { merge: true });

            // Audit logging
            await addDoc(collection(db, 'audit_logs'), {
                action: 'settings_update',
                userId: user.uid,
                userEmail: user.email,
                timestamp: serverTimestamp(),
                target: 'system/settings',
                changes: {
                    key,
                    previousValue,
                    newValue: value
                },
                ip: null, // Would need server-side for real IP
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
            });

        } catch (err: any) {
            console.error('Error updating setting:', err);
            throw new Error('فشل في تحديث الإعداد');
        }
    };

    // Update multiple settings at once (admin only)
    const updateSettings = async (updates: Partial<SystemSettings>): Promise<void> => {
        if (!user || !isAdminRole(role)) {
            throw new Error('غير مصرح لك بتعديل الإعدادات');
        }

        const previousSettings = { ...settings };
        const changes: Record<string, { previousValue: any; newValue: any }> = {};

        Object.keys(updates).forEach((key) => {
            const k = key as keyof SystemSettings;
            if (updates[k] !== undefined && updates[k] !== previousSettings[k]) {
                changes[key] = {
                    previousValue: previousSettings[k],
                    newValue: updates[k]
                };
            }
        });

        try {
            await setDoc(doc(db, 'system', 'settings'), {
                ...updates,
                updatedAt: serverTimestamp(),
                updatedBy: user.uid
            }, { merge: true });

            // Audit logging for bulk update
            if (Object.keys(changes).length > 0) {
                await addDoc(collection(db, 'audit_logs'), {
                    action: 'settings_bulk_update',
                    userId: user.uid,
                    userEmail: user.email,
                    timestamp: serverTimestamp(),
                    target: 'system/settings',
                    changes,
                    ip: null,
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
                });
            }

        } catch (err: any) {
            console.error('Error updating settings:', err);
            throw new Error('فشل في تحديث الإعدادات');
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, error, updateSetting, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

/**
 * Hook to access system settings
 */
export function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

/**
 * Hook to check if maintenance mode is active
 * Returns true if maintenance mode is on AND user is not admin
 */
export function useMaintenanceMode(): { isBlocked: boolean; loading: boolean } {
    const { settings, loading } = useSettings();
    const { role } = useAuth();

    return {
        isBlocked: settings.maintenanceMode && !isAdminRole(role),
        loading
    };
}

/**
 * Hook to check if registrations are allowed
 */
export function useRegistrationEnabled(): { allowed: boolean; loading: boolean } {
    const { settings, loading } = useSettings();

    return {
        allowed: settings.allowNewRegistrations,
        loading
    };
}
