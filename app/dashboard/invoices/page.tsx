/**
 * Invoices Dashboard Page
 * Displays all invoices with filter and download capabilities
 */

'use client';

import { useInvoices } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import InvoiceCard from '@/components/dashboard/InvoiceCard';
import { Filter, Loader2, AlertCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InvoicesPage() {
    const { user } = useAuth();
    const { invoices, loading, error } = useInvoices(user?.uid);
    const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter invoices
    const filteredInvoices = invoices.filter(invoice => {
        if (filter !== 'all' && invoice.status !== filter) return false;
        if (searchQuery && !invoice.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Calculate totals
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

    // Skeleton loader
    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-slate-900">الفواتير</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-slate-200 h-48 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">الفواتير</h1>
                    <p className="text-slate-600">إدارة وتتبع جميع فواتيرك</p>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">إجمالي الفواتير</p>
                    <p className="text-3xl font-bold text-slate-900">${totalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 backdrop-blur-xl rounded-xl p-6 border border-green-200">
                    <p className="text-sm text-green-700 mb-2">المدفوعة</p>
                    <p className="text-3xl font-bold text-green-700">${paidAmount.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 backdrop-blur-xl rounded-xl p-6 border border-yellow-200">
                    <p className="text-sm text-yellow-700 mb-2">قيد الانتظار</p>
                    <p className="text-3xl font-bold text-yellow-700">${pendingAmount.toLocaleString()}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="بحث برقم الفاتورة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="flex gap-2">
                    {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${filter === status
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-white/70 text-slate-700 hover:bg-slate-100'
                                }`}
                        >
                            {status === 'all' ? 'الكل' : status === 'paid' ? 'مدفوعة' : status === 'pending' ? 'معلقة' : 'متأخرة'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Invoices List */}
            {filteredInvoices.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center min-h-[300px] bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-300"
                >
                    <p className="text-lg text-slate-600">لا توجد فواتير</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))}
                </div>
            )}
        </div>
    );
}
