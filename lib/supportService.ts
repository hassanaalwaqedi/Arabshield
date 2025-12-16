/**
 * Support Service
 * Handles support ticket operations with Firestore
 */

import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    Timestamp,
    Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Types
export interface SupportTicket {
    id: string;
    userId: string;
    authorId: string; // Alias for userId for compatibility
    userEmail?: string;
    userName?: string;
    subject: string;
    title: string; // Alias for subject for compatibility
    message: string;
    status: 'open' | 'in_progress' | 'closed' | 'in-progress' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date | Timestamp | string;
    updatedAt?: Date | Timestamp | string;
    adminResponse?: string;
    respondedBy?: string;
    respondedAt?: Date | Timestamp | string;
}

export interface CreateTicketData {
    subject: string;
    message: string;
    priority?: 'low' | 'medium' | 'high';
}

// Collection reference
const TICKETS_COLLECTION = 'tickets';

/**
 * Create a new support ticket
 */
export async function createSupportTicket(
    userId: string,
    userEmail: string,
    userName: string,
    data: CreateTicketData
): Promise<string> {
    const ticketData = {
        userId,
        authorId: userId, // For compatibility with existing rules
        userEmail,
        userName,
        subject: data.subject,
        title: data.subject, // Alias
        message: data.message,
        status: 'open',
        priority: data.priority || 'medium',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, TICKETS_COLLECTION), ticketData);
    return docRef.id;
}

/**
 * Get all tickets for a user
 */
export async function getUserTickets(userId: string): Promise<SupportTicket[]> {
    const q = query(
        collection(db, TICKETS_COLLECTION),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as SupportTicket));
}

/**
 * Get all tickets (admin only)
 */
export async function getAllTickets(): Promise<SupportTicket[]> {
    const q = query(
        collection(db, TICKETS_COLLECTION),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as SupportTicket));
}

/**
 * Get a single ticket by ID
 */
export async function getTicketById(ticketId: string): Promise<SupportTicket | null> {
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as SupportTicket;
}

/**
 * Update ticket status (admin)
 */
export async function updateTicketStatus(
    ticketId: string,
    status: 'open' | 'in_progress' | 'closed' | 'in-progress' | 'resolved'
): Promise<void> {
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now(),
    });
}

/**
 * Add admin response to ticket
 */
export async function respondToTicket(
    ticketId: string,
    response: string,
    adminId: string
): Promise<void> {
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(docRef, {
        adminResponse: response,
        respondedBy: adminId,
        respondedAt: Timestamp.now(),
        status: 'in_progress',
        updatedAt: Timestamp.now(),
    });
}

/**
 * Close a ticket
 */
export async function closeTicket(ticketId: string): Promise<void> {
    const docRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(docRef, {
        status: 'closed',
        updatedAt: Timestamp.now(),
    });
}

/**
 * Subscribe to user's tickets (real-time)
 */
export function subscribeToUserTickets(
    userId: string,
    callback: (tickets: SupportTicket[]) => void
): Unsubscribe {
    const q = query(
        collection(db, TICKETS_COLLECTION),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as SupportTicket));
        callback(tickets);
    });
}

/**
 * Subscribe to all tickets (admin, real-time)
 */
export function subscribeToAllTickets(
    callback: (tickets: SupportTicket[]) => void
): Unsubscribe {
    const q = query(
        collection(db, TICKETS_COLLECTION),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as SupportTicket));
        callback(tickets);
    });
}

/**
 * Get ticket stats
 */
export async function getTicketStats(userId?: string): Promise<{
    total: number;
    open: number;
    inProgress: number;
    closed: number;
}> {
    const tickets = userId ? await getUserTickets(userId) : await getAllTickets();

    return {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in_progress' || t.status === 'in-progress').length,
        closed: tickets.filter(t => t.status === 'closed' || t.status === 'resolved').length,
    };
}
