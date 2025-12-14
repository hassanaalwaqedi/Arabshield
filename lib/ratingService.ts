'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';

export interface SubmitRatingParams {
    companyId: string;
    userId: string;
    userName: string;
    score: number;
    comment: string;
}

/**
 * Submit a new rating for a company/project
 */
export async function submitRating({ companyId, userId, userName, score, comment }: SubmitRatingParams): Promise<string> {
    try {
        // Check if user already rated this company
        const existingRating = await getUserRating(companyId, userId);
        if (existingRating) {
            throw new Error('لقد قمت بتقييم هذا المشروع مسبقاً');
        }

        // Validate score
        if (score < 1 || score > 5) {
            throw new Error('التقييم يجب أن يكون بين 1 و 5');
        }

        const docRef = await addDoc(collection(db, 'ratings'), {
            companyId,
            userId,
            userName,
            score,
            comment: comment.trim(),
            createdAt: new Date().toISOString()
        });

        return docRef.id;
    } catch (error: any) {
        console.error('Error submitting rating:', error);
        throw error;
    }
}

/**
 * Update an existing rating
 */
export async function updateRating(ratingId: string, score: number, comment: string): Promise<void> {
    try {
        if (score < 1 || score > 5) {
            throw new Error('التقييم يجب أن يكون بين 1 و 5');
        }

        const ratingRef = doc(db, 'ratings', ratingId);
        await updateDoc(ratingRef, {
            score,
            comment: comment.trim(),
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating rating:', error);
        throw new Error('فشل في تحديث التقييم');
    }
}

/**
 * Delete a rating
 */
export async function deleteRating(ratingId: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'ratings', ratingId));
    } catch (error) {
        console.error('Error deleting rating:', error);
        throw new Error('فشل في حذف التقييم');
    }
}

/**
 * Get user's existing rating for a company
 */
export async function getUserRating(companyId: string, userId: string): Promise<any | null> {
    try {
        const q = query(
            collection(db, 'ratings'),
            where('companyId', '==', companyId),
            where('userId', '==', userId)
        );

        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error getting user rating:', error);
        return null;
    }
}
