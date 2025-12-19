/**
 * Ticket List Component
 * Displays support tickets with filtering and status management
 */

'use client';

import { useSupportTickets, SupportTicket } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Clock, CheckCircle, Loader2, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function TicketList() {
    const { user } = useAuth();
    const { tickets, loading, error } = useSupportTickets(user?.uid);
    const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');

    // Filter tickets by status
    const filteredTickets = tickets.filter(ticket =>
        filter === 'all' || ticket.status === filter
    );

    // Get status info
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'open':
                return {
                    label: 'مفتوحة',
                    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                    icon: AlertCircle,
                };
            case 'in-progress':
                return {
                    label: 'قيد المعالجة',
                    color: 'bg-blue-100 text-blue-700 border-blue-200',
                    icon: Clock,
                };
            case 'resolved':
                return {
                    label: 'محلولة',
                    color: 'bg-green-100 text-green-700 border-green-200',
                    icon: CheckCircle,
                };
            default:
                return {
                    label: status,
                    color: 'bg-slate-100 text-slate-700 border-slate-200',
                    icon: AlertCircle,
                };
        }
    };

    // Get priority color
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-slate-600';
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-200 h-24 rounded-xl" />
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {(['all', 'open', 'in-progress', 'resolved'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === status
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-foreground shadow-lg'
                            : 'bg-white/70 text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        {status === 'all' ? 'الكل' : getStatusInfo(status).label}
                    </button>
                ))}
            </div>

            {/* Tickets List */}
            {filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white/70 rounded-2xl border-2 border-dashed border-slate-300">
                    <p className="text-slate-600">لا توجد تذاكر</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTickets.map((ticket, index) => {
                        const statusInfo = getStatusInfo(ticket.status);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-slate-200 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {ticket.title}
                                    </h3>
                                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} border`}>
                                        <StatusIcon size={14} />
                                        {statusInfo.label}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{ticket.message}</p>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                                        الأولوية: {ticket.priority === 'high' ? 'عالية' : ticket.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(ticket.createdAt).toLocaleDateString('ar-SA')}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
