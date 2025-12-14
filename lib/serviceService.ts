'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface CreateServiceParams {
    companyId: string;
    companyName: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    tags: string[];
    imageUrl?: string;
    featured?: boolean;
}

/**
 * Create a new service
 */
export async function createService(params: CreateServiceParams): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'services'), {
            ...params,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating service:', error);
        throw new Error('فشل في إنشاء الخدمة');
    }
}

/**
 * Update an existing service
 */
export async function updateService(serviceId: string, updates: Partial<CreateServiceParams>): Promise<void> {
    try {
        const serviceRef = doc(db, 'services', serviceId);
        await updateDoc(serviceRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating service:', error);
        throw new Error('فشل في تحديث الخدمة');
    }
}

/**
 * Delete a service
 */
export async function deleteService(serviceId: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'services', serviceId));
    } catch (error) {
        console.error('Error deleting service:', error);
        throw new Error('فشل في حذف الخدمة');
    }
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'SAR'): string {
    return `${price.toLocaleString('ar-SA')} ${currency}`;
}
