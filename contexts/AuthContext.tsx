'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
                // Set auth session cookie for middleware verification
                document.cookie = `auth-session=${firebaseUser.uid}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

                // SECURITY: Only fetch/create profile if email is verified
                if (firebaseUser.emailVerified) {
                    try {
                        const userDocRef = doc(db, 'users', firebaseUser.uid);
                        const userDoc = await getDoc(userDocRef);

                        if (userDoc.exists()) {
                            setUserProfile(userDoc.data() as UserProfile);
                        } else {
                            // User just verified email - create their profile NOW
                            // This is the ONLY place where user profile should be created
                            console.log('Creating user profile on first verified login');
                            const newProfile: UserProfile = {
                                uid: firebaseUser.uid,
                                email: firebaseUser.email || '',
                                name: firebaseUser.displayName || '',
                                role: 'client' as UserRole,
                                createdAt: new Date().toISOString()
                            };

                            await setDoc(userDocRef, newProfile);
                            setUserProfile(newProfile);
                        }
                    } catch (error) {
                        console.error('Error fetching/creating user profile:', error);
                        setUserProfile(null);
                    }
                } else {
                    // Email not verified - don't create or fetch profile
                    setUserProfile(null);
                }
            } else {
                // User logged out - remove auth cookie
                document.cookie = 'auth-session=; path=/; max-age=0; SameSite=Lax';
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
            // Clear auth cookie before signing out
            document.cookie = 'auth-session=; path=/; max-age=0; SameSite=Lax';
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
