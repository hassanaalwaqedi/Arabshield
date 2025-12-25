'use client';

/**
 * Dashboard Hooks
 * 
 * All React hooks for fetching dashboard data from Firestore.
 * Extracted from useDashboardData.ts for better organization.
 */

import { useEffect, useState, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import type {
    DashboardStats,
    Activity,
    MonthlyStats,
    Project,
    Invoice,
    SupportTicket,
    Task,
    ChatMessage,
    Document,
    Rating,
    Service,
} from './types';

/**
 * Custom hook to fetch dashboard statistics from Firestore
 * Computes REAL values from collections filtered by user ownership
 * @param userId - User ID to filter data by
 */
export function useDashboardStats(userId: string | undefined) {
    const [stats, setStats] = useState<DashboardStats>({
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        totalRevenue: 0,
        pendingInvoices: 0,
        openTickets: 0,
        resolvedTickets: 0,
        systemHealth: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const unsubscribes: (() => void)[] = [];
        let loadingCount = 3;
        const decrementLoading = () => {
            loadingCount--;
            if (loadingCount <= 0) setLoading(false);
        };

        // Query 1: Count user's projects by status
        const projectsQuery = query(
            collection(db, 'projects'),
            where('ownerId', '==', userId)
        );
        const projectsUnsubscribe = onSnapshot(
            projectsQuery,
            (snapshot) => {
                let active = 0;
                let completed = 0;
                let total = 0;
                snapshot.forEach((doc) => {
                    total++;
                    const status = doc.data().status;
                    if (status === 'active' || status === 'in-progress') active++;
                    if (status === 'completed') completed++;
                });
                setStats(prev => ({
                    ...prev,
                    totalProjects: total,
                    activeProjects: active,
                    completedProjects: completed
                }));
                decrementLoading();
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching projects:', err);
                }
                decrementLoading();
            }
        );
        unsubscribes.push(projectsUnsubscribe);

        // Query 2: Count user's tickets
        const ticketsQuery = query(
            collection(db, 'tickets'),
            where('authorId', '==', userId)
        );
        const ticketsUnsubscribe = onSnapshot(
            ticketsQuery,
            (snapshot) => {
                let open = 0;
                let resolved = 0;
                snapshot.forEach((doc) => {
                    const status = doc.data().status;
                    if (status === 'open' || status === 'in-progress') open++;
                    if (status === 'resolved' || status === 'closed') resolved++;
                });
                setStats(prev => ({
                    ...prev,
                    openTickets: open,
                    resolvedTickets: resolved
                }));
                decrementLoading();
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching tickets:', err);
                }
                decrementLoading();
            }
        );
        unsubscribes.push(ticketsUnsubscribe);

        // Query 3: Sum user's pending invoices
        const invoicesQuery = query(
            collection(db, 'invoices'),
            where('userId', '==', userId)
        );
        const invoicesUnsubscribe = onSnapshot(
            invoicesQuery,
            (snapshot) => {
                let pendingTotal = 0;
                let revenue = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.status === 'pending' || data.status === 'overdue') {
                        pendingTotal += data.amount || 0;
                    }
                    if (data.status === 'paid') {
                        revenue += data.amount || 0;
                    }
                });
                setStats(prev => ({
                    ...prev,
                    pendingInvoices: pendingTotal,
                    totalRevenue: revenue
                }));
                decrementLoading();
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching invoices:', err);
                }
                decrementLoading();
            }
        );
        unsubscribes.push(invoicesUnsubscribe);

        return () => {
            unsubscribes.forEach(unsub => unsub());
        };
    }, [userId]);

    return { stats, loading, error };
}

/**
 * Custom hook to fetch monthly statistics
 */
export function useMonthlyStats() {
    const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
        newOrders: 0,
        completedOrders: 0,
        meetings: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'statistics', 'monthly_stats'),
            (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setMonthlyStats({
                        newOrders: data.newOrders || 0,
                        completedOrders: data.completedOrders || 0,
                        meetings: data.meetings || 0
                    });
                }
                setLoading(false);
            },
            (error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching monthly stats:', error);
                }
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { monthlyStats, loading };
}

/**
 * Custom hook to fetch recent activities from Firestore
 */
export function useRecentActivities(userId: string | undefined, limitCount: number = 10) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setActivities([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'activities'),
            where('userId', '==', userId),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const activitiesData: Activity[] = [];
                snapshot.forEach((doc) => {
                    activitiesData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Activity);
                });
                setActivities(activitiesData);
                setLoading(false);
            },
            (error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching activities:', error);
                }
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId, limitCount]);

    return { activities, loading };
}

/**
 * Custom hook to fetch projects from Firestore
 */
export function useProjects(userId: string | undefined) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setProjects([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'projects'),
            where('ownerId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const projectsData: Project[] = [];
                snapshot.forEach((doc) => {
                    projectsData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Project);
                });
                setProjects(projectsData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching projects:', err);
                }
                setError('فشل في تحميل المشاريع');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { projects, loading, error };
}

/**
 * Custom hook to fetch invoices from Firestore
 */
export function useInvoices(userId: string | undefined) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setInvoices([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'invoices'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const invoicesData: Invoice[] = [];
                snapshot.forEach((doc) => {
                    invoicesData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Invoice);
                });
                setInvoices(invoicesData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching invoices:', err);
                }
                setError('فشل في تحميل الفواتير');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { invoices, loading, error };
}

/**
 * Custom hook to fetch support tickets from Firestore
 */
export function useSupportTickets(userId: string | undefined) {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setTickets([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'tickets'),
            where('authorId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const ticketsData: SupportTicket[] = [];
                snapshot.forEach((doc) => {
                    ticketsData.push({
                        id: doc.id,
                        ...doc.data()
                    } as SupportTicket);
                });
                setTickets(ticketsData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching tickets:', err);
                }
                setError('فشل في تحميل التذاكر');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { tickets, loading, error };
}

/**
 * Custom hook to fetch tasks assigned to user
 */
export function useTasks(userId: string | undefined) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'tasks'),
            where('assignedTo', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const tasksData: Task[] = [];
                snapshot.forEach((doc) => {
                    tasksData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Task);
                });
                setTasks(tasksData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching tasks:', err);
                }
                setError('فشل في تحميل المهام');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { tasks, loading, error };
}

/**
 * Custom hook to fetch tasks for a specific project
 */
export function useProjectTasks(projectId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'tasks'),
            where('projectId', '==', projectId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const tasksData: Task[] = [];
                snapshot.forEach((doc) => {
                    tasksData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Task);
                });
                setTasks(tasksData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching project tasks:', err);
                }
                setError('فشل في تحميل مهام المشروع');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [projectId]);

    return { tasks, loading, error };
}

/**
 * Custom hook to fetch chat messages for a project
 */
export function useProjectMessages(projectId: string) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setMessages([]);
            setLoading(false);
            return;
        }

        const messagesRef = collection(db, 'messages', projectId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const messagesData: ChatMessage[] = [];
                snapshot.forEach((doc) => {
                    messagesData.push({
                        id: doc.id,
                        ...doc.data()
                    } as ChatMessage);
                });
                setMessages(messagesData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching messages:', err);
                }
                setError('فشل في تحميل الرسائل');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [projectId]);

    return { messages, loading, error };
}

/**
 * Custom hook to fetch documents for a project
 */
export function useProjectDocuments(projectId: string) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setDocuments([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'documents'),
            where('projectId', '==', projectId),
            orderBy('uploadedAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const documentsData: Document[] = [];
                snapshot.forEach((doc) => {
                    documentsData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Document);
                });
                setDocuments(documentsData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching documents:', err);
                }
                setError('فشل في تحميل المستندات');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [projectId]);

    return { documents, loading, error };
}

/**
 * Custom hook to fetch ratings for a company
 */
export function useCompanyRatings(companyId: string) {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) {
            setRatings([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'ratings'),
            where('companyId', '==', companyId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const ratingsData: Rating[] = [];
                snapshot.forEach((doc) => {
                    ratingsData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Rating);
                });
                setRatings(ratingsData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching ratings:', err);
                }
                setError('فشل في تحميل التقييمات');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [companyId]);

    return { ratings, loading, error };
}

/**
 * Custom hook to calculate average rating
 */
export function useAverageRating(companyId: string) {
    const { ratings } = useCompanyRatings(companyId);

    const average = useMemo(() => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
        return sum / ratings.length;
    }, [ratings]);

    return { average, count: ratings.length };
}

/**
 * Custom hook to fetch all marketplace services
 */
export function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(
            collection(db, 'services'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const servicesData: Service[] = [];
                snapshot.forEach((doc) => {
                    servicesData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Service);
                });
                setServices(servicesData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching services:', err);
                }
                setError('فشل في تحميل الخدمات');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { services, loading, error };
}

/**
 * Custom hook to fetch services by company
 */
export function useCompanyServices(companyId: string) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) {
            setServices([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'services'),
            where('companyId', '==', companyId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const servicesData: Service[] = [];
                snapshot.forEach((doc) => {
                    servicesData.push({
                        id: doc.id,
                        ...doc.data()
                    } as Service);
                });
                setServices(servicesData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('Error fetching company services:', err);
                }
                setError('فشل في تحميل خدمات الشركة');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [companyId]);

    return { services, loading, error };
}
