'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

/**
 * Send a new message to a project chat
 */
export async function sendMessage(
    projectId: string,
    senderId: string,
    senderName: string,
    message: string
): Promise<string> {
    try {
        const messagesRef = collection(db, 'messages', projectId, 'messages');
        const docRef = await addDoc(messagesRef, {
            senderId,
            senderName,
            message,
            timestamp: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('فشل في إرسال الرسالة');
    }
}

/**
 * Delete a message from project chat
 */
export async function deleteMessage(projectId: string, messageId: string): Promise<void> {
    try {
        const messageRef = doc(db, 'messages', projectId, 'messages', messageId);
        await deleteDoc(messageRef);
    } catch (error) {
        console.error('Error deleting message:', error);
        throw new Error('فشل في حذف الرسالة');
    }
}
