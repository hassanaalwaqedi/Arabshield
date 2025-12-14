'use client';

import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

export interface UploadDocumentParams {
    projectId: string;
    file: File;
    uploadedBy: string;
}

/**
 * Upload a document to Firebase Storage and create Firestore record
 */
export async function uploadDocument({ projectId, file, uploadedBy }: UploadDocumentParams): Promise<string> {
    try {
        // Create unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `projects/${projectId}/documents/${filename}`);

        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);

        // Create Firestore record
        const docRef = await addDoc(collection(db, 'documents'), {
            projectId,
            filename: file.name,
            fileUrl,
            fileSize: file.size,
            fileType: file.type,
            uploadedBy,
            uploadedAt: new Date().toISOString()
        });

        return docRef.id;
    } catch (error) {
        console.error('Error uploading document:', error);
        throw new Error('فشل في رفع الملف');
    }
}

/**
 * Delete a document from Firestore and Firebase Storage
 */
export async function deleteDocument(docId: string, fileUrl: string): Promise<void> {
    try {
        // Delete from Firestore
        await deleteDoc(doc(db, 'documents', docId));

        // Delete from Storage
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);
    } catch (error) {
        console.error('Error deleting document:', error);
        throw new Error('فشل في حذف الملف');
    }
}

/**
 * Get download URL for a file
 */
export async function getFileDownloadUrl(fileUrl: string): Promise<string> {
    try {
        const fileRef = ref(storage, fileUrl);
        return await getDownloadURL(fileRef);
    } catch (error) {
        console.error('Error getting download URL:', error);
        throw new Error('فشل في الحصول على رابط التحميل');
    }
}

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file icon based on file type
 */
export function getFileIcon(fileType: string): string {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('video')) return '🎥';
    if (fileType.includes('audio')) return '🎵';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
    return '📎';
}
