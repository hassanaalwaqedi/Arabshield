/**
 * Support Dashboard Page
 * Manage support tickets and create new ones
 */

'use client';

import { useSupportTickets } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import TicketList from '@/components/dashboard/TicketList';
import { Plus, Loader2, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SupportPage() {
    const { user } = useAuth();
    const { tickets, loading } = useSupportTickets(user?.uid);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
    });
    const [submitting, setSubmitting] = useState(false);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        try {
            await addDoc(collection(db, 'tickets'), {
                ...formData,
                status: 'open',
                authorId: user.uid,
                createdAt: new Date().toISOString(),
            });

            // Reset form and close modal
            setFormData({ title: '', message: '', priority: 'medium' });
            setShowCreateModal(false);
            alert('تم إنشاء التذكرة بنجاح');
        } catch (error) {
            console.error('Error creating ticket:', error);
            alert('فشل في إنشاء التذكرة');
        } finally {
            setSubmitting(false);
        }
    };

    // Calculate stats
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">الدعم الفني</h1>
                    <p className="text-slate-600">إدارة تذاكر الدعم والمساعدة</p>
                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-xl hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    <span>تذكرة جديدة</span>
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">إجمالي التذاكر</p>
                    <p className="text-2xl font-bold text-slate-900">{tickets.length}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <p className="text-sm text-yellow-700 mb-1">مفتوحة</p>
                    <p className="text-2xl font-bold text-yellow-700">{openTickets}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 mb-1">قيد المعالجة</p>
                    <p className="text-2xl font-bold text-blue-700">{inProgressTickets}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-green-700 mb-1">محلولة</p>
                    <p className="text-2xl font-bold text-green-700">{resolvedTickets}</p>
                </div>
            </div>

            {/* Tickets List */}
            <TicketList />

            {/* Create Ticket Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">تذكرة دعم جديدة</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    عنوان التذكرة
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="مثال: مشكلة في الدفع"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    الرسالة
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                                    placeholder="اشرح المشكلة بالتفصيل..."
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    الأولوية
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="low">منخفضة</option>
                                    <option value="medium">متوسطة</option>
                                    <option value="high">عالية</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>جاري الإنشاء...</span>
                                        </>
                                    ) : (
                                        <span>إنشاء التذكرة</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
