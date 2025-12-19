/**
 * Firebase Server Configuration
 * 
 * For use in API routes and server components.
 * NO 'use client' - this runs on the server.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDoc } from 'firebase/firestore';

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

// ==================== SERVER-SIDE JOB FETCHING ====================

// Job type for server-side use
export interface ServerJob {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'remote' | 'contract';
    description: string;
    requirements: string[];
    responsibilities: string[];
    status?: 'open' | 'closed';
}

/**
 * Fetch job by ID - Server safe version for generateMetadata
 */
export async function getJobByIdServer(jobId: string): Promise<ServerJob | null> {
    try {
        const docRef = doc(db, 'careers_jobs', jobId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('[Server Firebase] Job found:', jobId);
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as ServerJob;
        }
        console.log('[Server Firebase] Job not found:', jobId);
        return null;
    } catch (error) {
        console.error('[Server Firebase] Error fetching job:', error);
        return null;
    }
}

// Job type labels (Arabic)
export const serverJobTypeLabels: Record<string, string> = {
    'full-time': 'دوام كامل',
    'part-time': 'دوام جزئي',
    'remote': 'عن بعد',
    'contract': 'عقد مؤقت'
};

// Department labels (Arabic)
export const serverDepartmentLabels: Record<string, string> = {
    'engineering': 'الهندسة',
    'design': 'التصميم',
    'marketing': 'التسويق',
    'sales': 'المبيعات',
    'support': 'الدعم الفني',
    'hr': 'الموارد البشرية',
    'finance': 'المالية',
    'operations': 'العمليات'
};
