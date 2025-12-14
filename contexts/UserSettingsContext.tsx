'use client';

/**
 * User Settings Context
 * Real-time user preferences from Firestore
 * Used for notification settings, avatar, etc.
 */

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

// User preferences schema
export interface UserPreferences {
    avatarUrl: string | null;
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReport: boolean;
    marketingEmails: boolean;
    twoFactorEnabled: boolean;
    fcmToken: string | null;
    updatedAt: any;
}

// Default preferences (GDPR-safe: marketing defaults to false)
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
    avatarUrl: null,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: false,
    marketingEmails: false, // GDPR-safe default
    twoFactorEnabled: false,
    fcmToken: null,
    updatedAt: null
};

interface UserSettingsContextType {
    preferences: UserPreferences;
    loading: boolean;
    error: string | null;
    saving: boolean;
    updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => Promise<void>;
    updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
    uploadAvatar: (file: File) => Promise<string>;
    deleteAvatar: () => Promise<void>;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

// Avatar validation
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function UserSettingsProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_USER_PREFERENCES);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Real-time listener for user preferences
    useEffect(() => {
        if (!user) {
            setPreferences(DEFAULT_USER_PREFERENCES);
            setLoading(false);
            return;
        }

        const prefsRef = doc(db, 'users', user.uid, 'settings', 'preferences');

        const unsubscribe = onSnapshot(
            prefsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data() as UserPreferences;
                    setPreferences({
                        ...DEFAULT_USER_PREFERENCES,
                        ...data
                    });
                } else {
                    // Document doesn't exist yet - use defaults (this is OK)
                    setPreferences(DEFAULT_USER_PREFERENCES);
                }
                setLoading(false);
                setError(null);
            },
            (err: any) => {
                // Check if it's a permission error
                if (err?.code === 'permission-denied' || err?.message?.includes('permission')) {
                    console.warn('User settings permissions not configured - using defaults. Deploy firestore rules to fix.');
                    // Don't show error to user, just use defaults
                    setPreferences(DEFAULT_USER_PREFERENCES);
                    setError(null);
                } else {
                    console.error('Error fetching user preferences:', err);
                    setError('فشل في تحميل إعدادات المستخدم');
                    setPreferences(DEFAULT_USER_PREFERENCES);
                }
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Update a single preference
    const updatePreference = useCallback(async <K extends keyof UserPreferences>(
        key: K,
        value: UserPreferences[K]
    ): Promise<void> => {
        if (!user) {
            throw new Error('يجب تسجيل الدخول لتحديث الإعدادات');
        }

        setSaving(true);
        try {
            const prefsRef = doc(db, 'users', user.uid, 'settings', 'preferences');
            await setDoc(prefsRef, {
                [key]: value,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err: any) {
            console.error('Error updating preference:', err);
            throw new Error('فشل في تحديث الإعداد');
        } finally {
            setSaving(false);
        }
    }, [user]);

    // Update multiple preferences at once
    const updatePreferences = useCallback(async (updates: Partial<UserPreferences>): Promise<void> => {
        if (!user) {
            throw new Error('يجب تسجيل الدخول لتحديث الإعدادات');
        }

        setSaving(true);
        try {
            const prefsRef = doc(db, 'users', user.uid, 'settings', 'preferences');
            await setDoc(prefsRef, {
                ...updates,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err: any) {
            console.error('Error updating preferences:', err);
            throw new Error('فشل في تحديث الإعدادات');
        } finally {
            setSaving(false);
        }
    }, [user]);

    // Upload avatar to Firebase Storage
    const uploadAvatar = useCallback(async (file: File): Promise<string> => {
        if (!user) {
            throw new Error('يجب تسجيل الدخول لرفع الصورة');
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error('نوع الملف غير مدعوم. الأنواع المسموحة: JPEG, PNG, WebP, GIF');
        }

        // Validate file size
        if (file.size > MAX_AVATAR_SIZE) {
            throw new Error('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت');
        }

        setSaving(true);
        try {
            // Upload to Storage
            const avatarRef = ref(storage, `avatars/${user.uid}.jpg`);
            await uploadBytes(avatarRef, file);

            // Get download URL
            const downloadURL = await getDownloadURL(avatarRef);

            // Update Firestore preferences
            const prefsRef = doc(db, 'users', user.uid, 'settings', 'preferences');
            await setDoc(prefsRef, {
                avatarUrl: downloadURL,
                updatedAt: serverTimestamp()
            }, { merge: true });

            // Update Auth profile
            await updateProfile(user, {
                photoURL: downloadURL
            });

            // Also update user document
            await setDoc(doc(db, 'users', user.uid), {
                avatarUrl: downloadURL,
                updatedAt: serverTimestamp()
            }, { merge: true });

            return downloadURL;
        } catch (err: any) {
            console.error('Error uploading avatar:', err);
            throw new Error('فشل في رفع الصورة: ' + (err.message || 'خطأ غير معروف'));
        } finally {
            setSaving(false);
        }
    }, [user]);

    // Delete avatar from Firebase Storage
    const deleteAvatar = useCallback(async (): Promise<void> => {
        if (!user) {
            throw new Error('يجب تسجيل الدخول لحذف الصورة');
        }

        setSaving(true);
        try {
            // Delete from Storage
            const avatarRef = ref(storage, `avatars/${user.uid}.jpg`);
            try {
                await deleteObject(avatarRef);
            } catch (e) {
                // Ignore if file doesn't exist
            }

            // Update Firestore preferences
            const prefsRef = doc(db, 'users', user.uid, 'settings', 'preferences');
            await setDoc(prefsRef, {
                avatarUrl: null,
                updatedAt: serverTimestamp()
            }, { merge: true });

            // Update Auth profile
            await updateProfile(user, {
                photoURL: null
            });

            // Also update user document
            await setDoc(doc(db, 'users', user.uid), {
                avatarUrl: null,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err: any) {
            console.error('Error deleting avatar:', err);
            throw new Error('فشل في حذف الصورة');
        } finally {
            setSaving(false);
        }
    }, [user]);

    return (
        <UserSettingsContext.Provider value={{
            preferences,
            loading,
            error,
            saving,
            updatePreference,
            updatePreferences,
            uploadAvatar,
            deleteAvatar
        }}>
            {children}
        </UserSettingsContext.Provider>
    );
}

/**
 * Hook to access user settings
 */
export function useUserSettings(): UserSettingsContextType {
    const context = useContext(UserSettingsContext);
    if (context === undefined) {
        throw new Error('useUserSettings must be used within a UserSettingsProvider');
    }
    return context;
}
