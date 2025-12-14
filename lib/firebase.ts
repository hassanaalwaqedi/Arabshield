'use client';

/**
 * Firebase Client Re-export
 * 
 * This file re-exports from the client-only module.
 * All Firebase imports should go through this file.
 */

export { db, auth, storage, default as app } from '@/lib/firebase/client';

// Re-export types if needed elsewhere
export type { Firestore } from 'firebase/firestore';
export type { Auth } from 'firebase/auth';
export type { FirebaseStorage } from 'firebase/storage';
