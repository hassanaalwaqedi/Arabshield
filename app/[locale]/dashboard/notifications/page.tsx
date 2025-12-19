'use client';

/**
 * Notifications Page
 * Real-time notifications from Firestore via Cloud Functions
 */

import { useRouter } from 'next/navigation';
import { ArrowRight, Bell, CheckCircle2, AlertCircle, Clock, MessageSquare, CreditCard, FileText, CheckSquare, Trash2, CheckCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications, Notification } from '@/lib/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { notifications, unreadCount, loading, error, markAsRead, markAllAsRead } = useNotifications(user?.uid, 50);

    // Get icon for notification type
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'ticket_status_change':
                return <MessageSquare className="h-5 w-5" />;
            case 'invoice_overdue':
                return <CreditCard className="h-5 w-5" />;
            case 'task_assigned':
                return <CheckSquare className="h-5 w-5" />;
            case 'project_update':
                return <FileText className="h-5 w-5" />;
            default:
                return <Bell className="h-5 w-5" />;
        }
    };

    // Get color for notification type
    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'ticket_status_change':
                return 'from-purple-500 to-pink-600';
            case 'invoice_overdue':
                return 'from-orange-500 to-red-500';
            case 'task_assigned':
                return 'from-blue-500 to-cyan-600';
            case 'project_update':
                return 'from-green-500 to-emerald-600';
            default:
                return 'from-electric-500 to-cyan-600';
        }
    };

    // Format relative time
    const formatTime = (timestamp: any) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'الآن';
        if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
        if (diffHours < 24) return `منذ ${diffHours} ساعة`;
        if (diffDays < 7) return `منذ ${diffDays} يوم`;
        return date.toLocaleDateString('ar-SA');
    };

    // Handle notification click
    const handleNotificationClick = async (notification: Notification) => {
        // Mark as read
        if (!notification.read) {
            await markAsRead(notification.id);
        }

        // Navigate to entity
        if (notification.entityType && notification.entityId) {
            switch (notification.entityType) {
                case 'ticket':
                    router.push('/dashboard/support');
                    break;
                case 'invoice':
                    router.push('/dashboard/invoices');
                    break;
                case 'task':
                    router.push('/dashboard/tasks');
                    break;
                case 'project':
                    router.push(`/dashboard/projects/${notification.entityId}`);
                    break;
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-abyss-50 via-electric-50/20 to-cyan-50/30 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-abyss-600 hover:text-electric-600 transition-colors mb-4"
                    >
                        <ArrowRight className="h-4 w-4" />
                        <span>رجوع</span>
                    </button>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-electric-500 to-cyan-600 p-3 rounded-2xl shadow-lg">
                                <Bell className="h-6 w-6 text-foreground" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-abyss-900">الإشعارات</h1>
                                <p className="text-abyss-600">
                                    {unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : 'لا توجد إشعارات جديدة'}
                                </p>
                            </div>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 bg-electric-100 hover:bg-electric-200 text-electric-700 rounded-xl transition-colors"
                            >
                                <CheckCheck className="h-4 w-4" />
                                <span className="text-sm font-medium">قراءة الكل</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 animate-pulse">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 bg-abyss-200 rounded-xl"></div>
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-abyss-200 rounded mb-2"></div>
                                        <div className="h-3 w-full bg-abyss-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && notifications.length === 0 && (
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-abyss-200/50 p-12 text-center">
                        <div className="bg-abyss-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell className="h-10 w-10 text-abyss-400" />
                        </div>
                        <h2 className="text-xl font-bold text-abyss-900 mb-2">لا توجد إشعارات</h2>
                        <p className="text-abyss-600 mb-6">
                            ستظهر هنا الإشعارات عند وجود تحديثات جديدة على مشاريعك أو تذاكرك
                        </p>
                    </div>
                )}

                {/* Notifications List */}
                {!loading && notifications.length > 0 && (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {notifications.map((notification, index) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`bg-white/70 backdrop-blur-xl rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-lg group ${notification.read
                                        ? 'border-abyss-100'
                                        : 'border-electric-300 bg-electric-50/30'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`bg-gradient-to-br ${getNotificationColor(notification.type)} p-3 rounded-xl text-foreground shadow-lg group-hover:scale-110 transition-transform`}>
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className={`font-semibold ${notification.read ? 'text-abyss-700' : 'text-abyss-900'}`}>
                                                    {notification.title}
                                                </h3>
                                                {!notification.read && (
                                                    <span className="flex-shrink-0 w-2 h-2 bg-electric-500 rounded-full mt-2"></span>
                                                )}
                                            </div>
                                            <p className="text-sm text-abyss-600 mb-2 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-abyss-400">
                                                <Clock className="h-3 w-3" />
                                                <span>{formatTime(notification.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
