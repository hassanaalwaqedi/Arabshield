'use client';

/**
 * Notification Hooks
 * Real-time notifications from Firestore
 */

import { useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import {
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
    doc,
    updateDoc,
    writeBatch
} from 'firebase/firestore';

export interface Notification {
    id: string;
    type: 'ticket_status_change' | 'invoice_overdue' | 'task_assigned' | 'project_update' | 'system';
    title: string;
    message: string;
    entityId?: string;
    entityType?: 'ticket' | 'invoice' | 'task' | 'project';
    read: boolean;
    createdAt: any;
}

/**
 * Hook to fetch user notifications in real-time
 */
export function useNotifications(userId: string | undefined, limitCount: number = 20) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setNotifications([]);
            setUnreadCount(0);
            setLoading(false);
            return;
        }

        // Subscribe to user's notifications
        const notificationsRef = collection(db, 'notifications', userId, 'items');
        const q = query(
            notificationsRef,
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const notificationsData: Notification[] = [];
                let unread = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    notificationsData.push({
                        id: doc.id,
                        ...data
                    } as Notification);

                    if (!data.read) unread++;
                });

                setNotifications(notificationsData);
                setUnreadCount(unread);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error('Error fetching notifications:', err);
                setError('فشل في تحميل الإشعارات');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId, limitCount]);

    // Mark a single notification as read
    const markAsRead = useCallback(async (notificationId: string) => {
        if (!userId) return;

        try {
            const notificationRef = doc(db, 'notifications', userId, 'items', notificationId);
            await updateDoc(notificationRef, { read: true });
        } catch (err) {
            console.error('Error marking notification as read:', err);
        }
    }, [userId]);

    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        if (!userId || notifications.length === 0) return;

        try {
            const batch = writeBatch(db);
            const unreadNotifications = notifications.filter(n => !n.read);

            unreadNotifications.forEach((notification) => {
                const notificationRef = doc(db, 'notifications', userId, 'items', notification.id);
                batch.update(notificationRef, { read: true });
            });

            await batch.commit();
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
        }
    }, [userId, notifications]);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        markAllAsRead
    };
}

/**
 * Hook to fetch system health from server-computed stats
 */
export function useSystemHealth() {
    const [systemHealth, setSystemHealth] = useState<number | null>(null);
    const [lastCheck, setLastCheck] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'statistics', 'system'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setSystemHealth(data.systemHealth ?? null);
                    setLastCheck(data.lastCheck?.toDate() ?? null);
                } else {
                    setSystemHealth(null);
                }
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching system health:', error);
                setSystemHealth(null);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { systemHealth, lastCheck, loading };
}

/**
 * Hook to fetch pre-aggregated user stats from Cloud Functions
 */
export function useServerStats(userId: string | undefined) {
    const [stats, setStats] = useState({
        activeProjects: 0,
        completedProjects: 0,
        totalProjects: 0,
        openTickets: 0,
        resolvedTickets: 0,
        pendingInvoices: 0,
        totalRevenue: 0,
        ticketResolutionRate: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(db, 'statistics', `user_${userId}`),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setStats({
                        activeProjects: data.activeProjects || 0,
                        completedProjects: data.completedProjects || 0,
                        totalProjects: data.totalProjects || 0,
                        openTickets: data.openTickets || 0,
                        resolvedTickets: data.resolvedTickets || 0,
                        pendingInvoices: data.pendingInvoices || 0,
                        totalRevenue: data.totalRevenue || 0,
                        ticketResolutionRate: data.ticketResolutionRate || 0
                    });
                }
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching user stats:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { stats, loading };
}
