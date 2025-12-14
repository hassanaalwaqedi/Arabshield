'use client';

import { db } from '@/lib/firebase';
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';
import { Task } from '@/lib/useDashboardData';

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;

/**
 * Create a new task in Firestore
 */
export async function createTask(taskData: TaskInput): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'tasks'), {
            ...taskData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('فشل في إنشاء المهمة');
    }
}

/**
 * Update an existing task in Firestore
 */
export async function updateTask(taskId: string, updates: TaskUpdate): Promise<void> {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('فشل في تحديث المهمة');
    }
}

/**
 * Delete a task from Firestore
 */
export async function deleteTask(taskId: string): Promise<void> {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('فشل في حذف المهمة');
    }
}

/**
 * Get a single task by ID
 */
export async function getTask(taskId: string): Promise<Task | null> {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        const taskSnap = await getDoc(taskRef);

        if (taskSnap.exists()) {
            return {
                id: taskSnap.id,
                ...taskSnap.data()
            } as Task;
        }
        return null;
    } catch (error) {
        console.error('Error getting task:', error);
        throw new Error('فشل في جلب المهمة');
    }
}

/**
 * Toggle task status to completed or back to in-progress
 */
export async function toggleTaskComplete(taskId: string, currentStatus: string): Promise<void> {
    const newStatus = currentStatus === 'completed' ? 'in-progress' : 'completed';
    await updateTask(taskId, { status: newStatus as Task['status'] });
}
