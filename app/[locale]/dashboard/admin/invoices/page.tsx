"use client";

/**
 * Admin Invoice Management Page
 * Create and manage invoices for clients
 * Owner/Admin only access
 */

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import {
    createInvoice,
    updateInvoiceStatus,
    markInvoiceSent,
    openInvoiceEmail,
    formatCurrency,
    Invoice,
    CreateInvoiceParams
} from '@/lib/invoiceService';
import { downloadInvoicePDF } from '@/lib/invoicePDF';
import { useEscapeKey } from '@/lib/useKeyboardShortcuts';
import { useToast } from '@/contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Receipt,
    Loader2,
    AlertCircle,
    Plus,
    X,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Mail,
    Eye,
    Search,
    Filter,
    DollarSign,
    Calendar,
    User,
    Building2,
    Send,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// User interface for client selection
interface UserOption {
    id: string;
    name: string;
    email: string;
}

// Project interface for project selection
interface ProjectOption {
    id: string;
    title: string;
    ownerId: string;
}

const STATUS_CONFIG = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
    paid: { label: 'مدفوعة', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
    overdue: { label: 'متأخرة', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertTriangle },
};

export default function AdminInvoicesPage() {
    const router = useRouter();
    const { role, loading: authLoading } = useAuth();
    const toast = useToast();

    // State
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [users, setUsers] = useState<UserOption[]>([]);
    const [projects, setProjects] = useState<ProjectOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [updating, setUpdating] = useState(false);
    const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // ESC key to close modals
    useEscapeKey(() => {
        if (selectedInvoice) setSelectedInvoice(null);
        else if (showCreateModal) setShowCreateModal(false);
    }, !!(selectedInvoice || showCreateModal));

    // Form state
    const [formData, setFormData] = useState({
        userId: '',
        clientEmail: '',
        clientName: '',
        projectId: '',
        projectTitle: '',
        amount: '',
        currency: 'SAR',
        dueDate: '',
        notes: ''
    });
    const [creating, setCreating] = useState(false);

    // Fetch data
    useEffect(() => {
        if (authLoading) return;

        if (!isAdminRole(role)) {
            router.push('/dashboard');
            return;
        }

        // Fetch users
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name || 'بدون اسم',
                    email: doc.data().email || ''
                }));
                setUsers(usersData);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        // Fetch projects
        const fetchProjects = async () => {
            try {
                const projectsSnapshot = await getDocs(collection(db, 'projects'));
                const projectsData = projectsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title || 'مشروع بدون عنوان',
                    ownerId: doc.data().ownerId || ''
                }));
                setProjects(projectsData);
            } catch (err) {
                console.error('Error fetching projects:', err);
            }
        };

        // Real-time invoices listener
        const q = query(collection(db, 'invoices'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const invoicesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Invoice[];
                setInvoices(invoicesData);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching invoices:', err);
                setError('فشل في تحميل الفواتير');
                setLoading(false);
            }
        );

        fetchUsers();
        fetchProjects();

        return () => unsubscribe();
    }, [authLoading, role, router]);

    // Filter invoices
    const filteredInvoices = useMemo(() => {
        return invoices.filter(invoice => {
            if (filter !== 'all' && invoice.status !== filter) return false;
            if (searchQuery) {
                const search = searchQuery.toLowerCase();
                return (
                    invoice.invoiceNumber?.toLowerCase().includes(search) ||
                    invoice.clientName?.toLowerCase().includes(search) ||
                    invoice.clientEmail?.toLowerCase().includes(search)
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
        const overdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + (inv.amount || 0), 0);
        return { total, paid, pending, overdue };
    }, [invoices]);

    // Handle user selection
    const handleUserSelect = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setFormData(prev => ({
                ...prev,
                userId,
                clientEmail: user.email,
                clientName: user.name
            }));
        }
    };

    // Handle project selection
    const handleProjectSelect = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            setFormData(prev => ({
                ...prev,
                projectId,
                projectTitle: project.title
            }));
        }
    };

    // Create invoice
    const handleCreateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.userId || !formData.amount || !formData.dueDate) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setCreating(true);
        setError(null);

        try {
            const params: CreateInvoiceParams = {
                userId: formData.userId,
                clientEmail: formData.clientEmail,
                clientName: formData.clientName,
                projectId: formData.projectId || undefined,
                projectTitle: formData.projectTitle || undefined,
                amount: parseFloat(formData.amount),
                currency: formData.currency,
                dueDate: formData.dueDate,
                notes: formData.notes
            };

            await createInvoice(params);
            setShowCreateModal(false);
            setFormData({
                userId: '',
                clientEmail: '',
                clientName: '',
                projectId: '',
                projectTitle: '',
                amount: '',
                currency: 'SAR',
                dueDate: '',
                notes: ''
            });
        } catch (err: any) {
            setError(err.message || 'فشل في إنشاء الفاتورة');
        } finally {
            setCreating(false);
        }
    };

    // Update status
    const handleStatusUpdate = async (invoiceId: string, status: 'pending' | 'paid' | 'overdue') => {
        setUpdating(true);
        try {
            await updateInvoiceStatus(invoiceId, status);
            if (selectedInvoice?.id === invoiceId) {
                setSelectedInvoice({ ...selectedInvoice, status });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    // Send invoice email
    const handleSendEmail = async (invoice: Invoice) => {
        openInvoiceEmail(invoice);
        try {
            await markInvoiceSent(invoice.id);
        } catch (err) {
            console.error('Error marking invoice as sent:', err);
        }
    };

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

    // Access denied
    if (!isAdminRole(role)) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                                <Receipt className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">إدارة الفواتير</h1>
                                <p className="text-slate-400 text-sm">{invoices.length} فاتورة</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                        >
                            <Plus className="w-4 h-4 ml-2" />
                            إنشاء فاتورة
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                        <p className="text-sm text-red-400 mb-2">متأخرة</p>
                        <p className="text-2xl font-bold text-red-400">{formatCurrency(totals.overdue, 'SAR')}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="بحث برقم الفاتورة أو اسم العميل..."
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
                        <p className="text-slate-400">اضغط على "إنشاء فاتورة" لإضافة فاتورة جديدة</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredInvoices.map((invoice, index) => {
                            const StatusIcon = STATUS_CONFIG[invoice.status]?.icon || Clock;
                            const statusConfig = STATUS_CONFIG[invoice.status] || STATUS_CONFIG.pending;

                            return (
                                <motion.div
                                    key={invoice.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="font-mono text-sm text-blue-400">{invoice.invoiceNumber}</span>
                                                <Badge className={`${statusConfig.color} border`}>
                                                    <StatusIcon className="w-3 h-3 ml-1" />
                                                    {statusConfig.label}
                                                </Badge>
                                                {invoice.sentAt && (
                                                    <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                                        <Mail className="w-3 h-3 ml-1" />
                                                        تم الإرسال
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <User className="w-4 h-4" />
                                                    <span>{invoice.clientName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{invoice.clientEmail}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span className="font-bold text-white">{formatCurrency(invoice.amount, invoice.currency)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(invoice.dueDate)}</span>
                                                </div>
                                            </div>

                                            {invoice.projectTitle && (
                                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                    <Building2 className="w-3 h-3" />
                                                    <span>{invoice.projectTitle}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedInvoice(invoice)}
                                                className="text-slate-400 hover:text-white"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleSendEmail(invoice)}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                <Send className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Create Invoice Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                <h2 className="text-xl font-bold">إنشاء فاتورة جديدة</h2>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
                                {/* Client Selection */}
                                <div>
                                    <label className="text-xs text-slate-500 block mb-1">العميل *</label>
                                    <select
                                        value={formData.userId}
                                        onChange={(e) => handleUserSelect(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                        required
                                    >
                                        <option value="">اختر العميل</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Project Selection (Optional) */}
                                <div>
                                    <label className="text-xs text-slate-500 block mb-1">المشروع (اختياري)</label>
                                    <select
                                        value={formData.projectId}
                                        onChange={(e) => handleProjectSelect(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">بدون مشروع</option>
                                        {projects.map(project => (
                                            <option key={project.id} value={project.id}>
                                                {project.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Amount & Currency */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">المبلغ *</label>
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">العملة</label>
                                        <select
                                            value={formData.currency}
                                            onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="SAR">ريال سعودي (SAR)</option>
                                            <option value="USD">دولار أمريكي (USD)</option>
                                            <option value="EUR">يورو (EUR)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label className="text-xs text-slate-500 block mb-1">تاريخ الاستحقاق *</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="text-xs text-slate-500 block mb-1">ملاحظات</label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none"
                                        rows={3}
                                        placeholder="ملاحظات إضافية..."
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={creating}
                                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                                    >
                                        {creating ? (
                                            <Loader2 className="w-4 h-4 animate-spin ml-2" />
                                        ) : (
                                            <Plus className="w-4 h-4 ml-2" />
                                        )}
                                        إنشاء الفاتورة
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setShowCreateModal(false)}
                                        className="border border-slate-700"
                                    >
                                        إلغاء
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Invoice Detail Modal */}
            <AnimatePresence>
                {selectedInvoice && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                <h2 className="text-xl font-bold">فاتورة {selectedInvoice.invoiceNumber}</h2>
                                <button
                                    onClick={() => setSelectedInvoice(null)}
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">العميل</label>
                                        <p className="font-medium">{selectedInvoice.clientName}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">البريد الإلكتروني</label>
                                        <p className="font-medium text-blue-400">{selectedInvoice.clientEmail}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">المبلغ</label>
                                        <p className="font-bold text-2xl">{formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">تاريخ الاستحقاق</label>
                                        <p className="font-medium">{formatDate(selectedInvoice.dueDate)}</p>
                                    </div>
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

                                <div>
                                    <label className="text-xs text-slate-500 block mb-2">تحديث الحالة</label>
                                    <div className="flex flex-wrap gap-2">
                                        {(Object.keys(STATUS_CONFIG) as ('pending' | 'paid' | 'overdue')[]).map((status) => {
                                            const config = STATUS_CONFIG[status];
                                            return (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusUpdate(selectedInvoice.id, status)}
                                                    disabled={updating || selectedInvoice.status === status}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedInvoice.status === status
                                                        ? config.color + ' border'
                                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                        }`}
                                                >
                                                    {config.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-slate-800">
                                    <Button
                                        onClick={() => downloadInvoicePDF(selectedInvoice)}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                                    >
                                        <Download className="w-4 h-4 ml-2" />
                                        تحميل PDF
                                    </Button>
                                    <Button
                                        onClick={() => handleSendEmail(selectedInvoice)}
                                        className="bg-blue-600 hover:bg-blue-500"
                                    >
                                        <Send className="w-4 h-4 ml-2" />
                                        إرسال للعميل
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
