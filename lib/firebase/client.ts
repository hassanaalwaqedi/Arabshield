'use client';

/**
 * Firebase Client Configuration
 * 
 * CLIENT-ONLY: This file must ONLY be imported in client components.
 * Uses 'use client' directive to prevent SSR execution.
 * 
 * IDEMPOTENT: Firebase is initialized ONLY ONCE, then reused.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validate config only on client and in development
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.log('[Firebase Config]', {
        apiKey: firebaseConfig.apiKey ? '✓ SET' : '✗ MISSING',
        projectId: firebaseConfig.projectId ? '✓ SET' : '✗ MISSING',
    });

    if (!firebaseConfig.apiKey) {
        console.error(
            'Firebase API key missing!\n' +
            'Add to .env.local: NEXT_PUBLIC_FIREBASE_API_KEY=your_key'
        );
    }
}

/**
 * Idempotent Firebase App Initialization
 * initializeApp() will NEVER run more than once
 */
function getFirebaseApp(): FirebaseApp {
    if (getApps().length === 0) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}

// Get or create the Firebase app (singleton)
const app: FirebaseApp = getFirebaseApp();

// Export Firebase services
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);
export default app;
