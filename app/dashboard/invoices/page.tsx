/**
 * Client Invoices Dashboard Page
 * Displays invoices for authenticated users
 * Dark theme - ArabShield design system
 */

'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { formatCurrency, Invoice } from '@/lib/invoiceService';
import { downloadInvoicePDF } from '@/lib/invoicePDF';
import { useEscapeKey } from '@/lib/useKeyboardShortcuts';
import { useToast } from '@/contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Receipt,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Search,
    Download,
    Printer,
    X,
    DollarSign,
    Calendar,
    Building2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const STATUS_CONFIG = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
    paid: { label: 'مدفوعة', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
    overdue: { label: 'متأخرة', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertTriangle },
};

export default function InvoicesPage() {
    const { user, loading: authLoading } = useAuth();
    const toast = useToast();

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    // ESC key to close modal
    useEscapeKey(() => setSelectedInvoice(null), !!selectedInvoice);


    // Fetch user's invoices (by userId OR clientEmail)
    useEffect(() => {
        if (authLoading) return;
        if (!user || !user.email) {
            setLoading(false);
            return;
        }

        // Query by userId first
        const q1 = query(
            collection(db, 'invoices'),
            where('userId', '==', user.uid)
        );

        // Query by clientEmail as backup (for invoices created with email before user registered)
        const q2 = query(
            collection(db, 'invoices'),
            where('clientEmail', '==', user.email)
        );

        // Track if we've set initial data
        let q1Data: Invoice[] = [];
        let q2Data: Invoice[] = [];
        let q1Loaded = false;
        let q2Loaded = false;

        const mergeAndSetInvoices = () => {
            if (!q1Loaded || !q2Loaded) return;

            // Merge both queries, removing duplicates by id
            const allInvoices = [...q1Data];
            q2Data.forEach(inv => {
                if (!allInvoices.find(existing => existing.id === inv.id)) {
                    allInvoices.push(inv);
                }
            });

            // Sort client-side by createdAt descending
            allInvoices.sort((a, b) => {
                const dateA = a.createdAt ? (typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt.toDate()) : new Date(0);
                const dateB = b.createdAt ? (typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt.toDate()) : new Date(0);
                return dateB.getTime() - dateA.getTime();
            });

            setInvoices(allInvoices);
            setLoading(false);
        };

        const unsub1 = onSnapshot(q1,
            (snapshot) => {
                q1Data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Invoice[];
                q1Loaded = true;
                mergeAndSetInvoices();
            },
            (err) => {
                console.error('Error fetching invoices by userId:', err);
                q1Loaded = true;
                mergeAndSetInvoices();
            }
        );

        const unsub2 = onSnapshot(q2,
            (snapshot) => {
                q2Data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Invoice[];
                q2Loaded = true;
                mergeAndSetInvoices();
            },
            (err) => {
                console.error('Error fetching invoices by email:', err);
                q2Loaded = true;
                mergeAndSetInvoices();
            }
        );

        return () => {
            unsub1();
            unsub2();
        };
    }, [user, authLoading]);

    // Filter invoices
    const filteredInvoices = useMemo(() => {
        return invoices.filter(invoice => {
            if (filter !== 'all' && invoice.status !== filter) return false;
            if (searchQuery) {
                const search = searchQuery.toLowerCase();
                return (
                    invoice.invoiceNumber?.toLowerCase().includes(search) ||
                    invoice.projectTitle?.toLowerCase().includes(search)
                );
            }
            return true;
        });
    }, [invoices, filter, searchQuery]);

    // Calculate totals
    const totals = useMemo(() => {
        const total = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
        const paid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + (inv.amount || 0), 0);
        const pending = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + (inv.amount || 0), 0);
        return { total, paid, pending };
    }, [invoices]);

    // Format date
    const formatDate = (date: string | Timestamp) => {
        if (!date) return 'غير محدد';
        const d = typeof date === 'string' ? new Date(date) : date.toDate();
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(d);
    };

    // Loading state
    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    // Not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg">يجب تسجيل الدخول لعرض الفواتير</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                            <Receipt className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">الفواتير</h1>
                            <p className="text-slate-400 text-sm">إدارة وتتبع فواتيرك</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                        {error}
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <p className="text-sm text-slate-400 mb-2">إجمالي الفواتير</p>
                        <p className="text-2xl font-bold">{formatCurrency(totals.total, 'SAR')}</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                        <p className="text-sm text-green-400 mb-2">المدفوعة</p>
                        <p className="text-2xl font-bold text-green-400">{formatCurrency(totals.paid, 'SAR')}</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                        <p className="text-sm text-yellow-400 mb-2">قيد الانتظار</p>
                        <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totals.pending, 'SAR')}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="بحث برقم الفاتورة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-12 pl-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'pending', 'paid', 'overdue'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${filter === status
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                    : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-slate-800'
                                    }`}
                            >
                                {status === 'all' ? 'الكل' :
                                    status === 'paid' ? 'مدفوعة' :
                                        status === 'pending' ? 'معلقة' : 'متأخرة'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Invoices List */}
                {filteredInvoices.length === 0 ? (
                    <div className="text-center py-20">
                        <Receipt className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">لا توجد فواتير</h3>
                        <p className="text-slate-400">ستظهر فواتيرك هنا عند إصدارها</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredInvoices.map((invoice, index) => {
                            const StatusIcon = STATUS_CONFIG[invoice.status]?.icon || Clock;
                            const statusConfig = STATUS_CONFIG[invoice.status] || STATUS_CONFIG.pending;

                            return (
                                <motion.div
                                    key={invoice.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedInvoice(invoice)}
                                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-mono text-sm text-blue-400">{invoice.invoiceNumber}</span>
                                        <Badge className={`${statusConfig.color} border`}>
                                            <StatusIcon className="w-3 h-3 ml-1" />
                                            {statusConfig.label}
                                        </Badge>
                                    </div>

                                    <p className="text-3xl font-bold mb-4">
                                        {formatCurrency(invoice.amount, invoice.currency)}
                                    </p>

                                    <div className="space-y-2 text-sm text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>تاريخ الاستحقاق: {formatDate(invoice.dueDate)}</span>
                                        </div>
                                        {invoice.projectTitle && (
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4" />
                                                <span>{invoice.projectTitle}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-center text-blue-400 hover:text-blue-300"
                                        >
                                            <Download className="w-4 h-4 ml-2" />
                                            عرض التفاصيل
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Invoice Detail Modal */}
            <AnimatePresence>
                {selectedInvoice && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">فاتورة {selectedInvoice.invoiceNumber}</h2>
                                    <Badge className={`${STATUS_CONFIG[selectedInvoice.status]?.color} border mt-2`}>
                                        {STATUS_CONFIG[selectedInvoice.status]?.label}
                                    </Badge>
                                </div>
                                <button
                                    onClick={() => setSelectedInvoice(null)}
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="text-center py-6 bg-slate-800/50 rounded-xl">
                                    <p className="text-sm text-slate-400 mb-2">المبلغ المستحق</p>
                                    <p className="text-4xl font-bold">{formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">تاريخ الاستحقاق</label>
                                        <p className="font-medium">{formatDate(selectedInvoice.dueDate)}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">تاريخ الإنشاء</label>
                                        <p className="font-medium">{formatDate(selectedInvoice.createdAt)}</p>
                                    </div>
                                    {selectedInvoice.paidAt && (
                                        <div className="col-span-2">
                                            <label className="text-xs text-slate-500 block mb-1">تاريخ الدفع</label>
                                            <p className="font-medium text-green-400">{formatDate(selectedInvoice.paidAt)}</p>
                                        </div>
                                    )}
                                    {selectedInvoice.projectTitle && (
                                        <div className="col-span-2">
                                            <label className="text-xs text-slate-500 block mb-1">المشروع</label>
                                            <p className="font-medium">{selectedInvoice.projectTitle}</p>
                                        </div>
                                    )}
                                </div>

                                {selectedInvoice.notes && (
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">ملاحظات</label>
                                        <p className="bg-slate-800/50 rounded-xl p-4 text-slate-300">
                                            {selectedInvoice.notes}
                                        </p>
                                    </div>
                                )}

                                {selectedInvoice.status === 'pending' && (
                                    <div className="pt-4 border-t border-slate-800">
                                        <p className="text-sm text-slate-400 text-center">
                                            للدفع، يرجى التواصل مع فريق الدعم أو استخدام طرق الدفع المعتمدة
                                        </p>
                                    </div>
                                )}

                                {/* Download PDF Button */}
                                <div className="pt-4 border-t border-slate-800">
                                    <Button
                                        onClick={() => downloadInvoicePDF(selectedInvoice)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                                    >
                                        <Download className="w-4 h-4 ml-2" />
                                        تحميل الفاتورة PDF
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
