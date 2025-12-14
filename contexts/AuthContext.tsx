'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserRole, DEFAULT_ROLE } from '@/lib/authorization';

/**
 * User profile stored in Firestore users collection
 */
interface UserProfile {
    uid: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
}

/**
 * Auth context value
 */
interface AuthContextValue {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    isVerified: boolean;
    role: UserRole | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Auth Provider Component
 * Wraps the application and provides auth state globally
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Single global auth state listener
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Fetch user profile from Firestore
                try {
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUserProfile(userDoc.data() as UserProfile);
                    } else {
                        // User exists in Auth but not in Firestore yet
                        // This can happen if profile creation failed
                        setUserProfile(null);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setUserProfile(null);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Sign out the current user
     */
    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
            setUserProfile(null);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value: AuthContextValue = {
        user,
        userProfile,
        loading,
        isVerified: user?.emailVerified ?? false,
        role: userProfile?.role ?? null,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to access auth context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default AuthContext;
