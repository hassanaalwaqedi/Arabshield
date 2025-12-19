/**
 * Activities List Component
 * Displays recent activities feed with real-time updates
 */

'use client';

import { useRecentActivities, formatRelativeTime, getActivityStyle } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, CreditCard, MessageSquare, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivitiesListProps {
    limit?: number;
}

export default function ActivitiesList({ limit = 10 }: ActivitiesListProps) {
    const { user } = useAuth();
    const { activities, loading } = useRecentActivities(user?.uid, limit);

    // Get icon based on activity type
    const getIcon = (type: string) => {
        if (type.includes('order')) return FileText;
        if (type.includes('payment')) return CreditCard;
        if (type.includes('ticket')) return MessageSquare;
        return CheckCircle2;
    };

    // Loading state
    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-200 h-20 rounded-xl" />
                ))}
            </div>
        );
    }

    // Empty state
    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Clock className="w-12 h-12 mb-3 opacity-50" />
                <p>لا توجد أنشطة حديثة</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {activities.map((activity, index) => {
                const style = getActivityStyle(activity.type);
                const Icon = getIcon(activity.type);

                return (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-slate-200 hover:shadow-lg transition-all group"
                    >
                        {/* Icon */}
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${style.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5 text-foreground" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 mb-1">{activity.description}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock size={12} />
                                {formatRelativeTime(activity.timestamp)}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
