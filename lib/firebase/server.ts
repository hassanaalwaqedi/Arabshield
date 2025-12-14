/**
 * Firebase Server Configuration
 * 
 * For use in API routes and server components.
 * NO 'use client' - this runs on the server.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

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

/**
 * Idempotent Firebase App Initialization for Server
 */
function getFirebaseApp(): FirebaseApp {
    // Validate config
    if (!firebaseConfig.apiKey) {
        throw new Error(
            'Firebase API key missing on server!\n' +
            'Make sure .env.local has NEXT_PUBLIC_FIREBASE_API_KEY'
        );
    }

    if (getApps().length === 0) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}

// Get or create the Firebase app
const app: FirebaseApp = getFirebaseApp();

// Export Firestore - guaranteed non-null now
export const db: Firestore = getFirestore(app);
export { app };
