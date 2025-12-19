"use client";

/**
 * Admin Orders Management Page
 * View and manage incoming orders from the Order form
 * Owner/Admin only access
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
    ShoppingCart,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Clock,
    XCircle,
    Mail,
    Building2,
    DollarSign,
    FileText,
    Trash2,
    Eye,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Order {
    id: string;
    fullName: string;
    email: string;
    company?: string;
    service: string;
    budget: string;
    details: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    createdAt: Timestamp;
}

const STATUS_CONFIG = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
    'in-progress': { label: 'قيد التنفيذ', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Loader2 },
    completed: { label: 'مكتمل', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
    cancelled: { label: 'ملغي', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle },
};

export default function AdminOrdersPage() {
    const router = useRouter();
    const { role, loading: authLoading } = useAuth();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updating, setUpdating] = useState(false);

    // Fetch orders
    useEffect(() => {
        if (authLoading) return;

        if (!isAdminRole(role)) {
            router.push('/dashboard');
            return;
        }

        const fetchOrders = async () => {
            try {
                const ordersRef = collection(db, 'orders');
                const q = query(ordersRef, orderBy('createdAt', 'desc'));
                const snapshot = await getDocs(q);

                const ordersData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Order[];

                setOrders(ordersData);
            } catch (err: any) {
                console.error('Error fetching orders:', err);
                setError('فشل في تحميل الطلبات');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [authLoading, role, router]);

    // Update order status
    const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
        setUpdating(true);
        try {
            await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (err) {
            console.error('Error updating order:', err);
            setError('فشل في تحديث حالة الطلب');
        } finally {
            setUpdating(false);
        }
    };

    // Delete order
    const handleDelete = async (orderId: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

        try {
            await deleteDoc(doc(db, 'orders', orderId));
            setOrders(prev => prev.filter(order => order.id !== orderId));
            setSelectedOrder(null);
        } catch (err) {
            console.error('Error deleting order:', err);
            setError('فشل في حذف الطلب');
        }
    };

    // Format date
    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'غير محدد';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Loading state
    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    // Access denied
    if (!isAdminRole(role)) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">
            {/* Header */}
            <div className="border-b border-border bg-card/50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">إدارة الطلبات</h1>
                            <p className="text-muted-foreground text-sm">{orders.length} طلب</p>
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

                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">لا توجد طلبات بعد</h3>
                        <p className="text-muted-foreground">ستظهر الطلبات هنا عند استلامها</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {orders.map((order, index) => {
                            const StatusIcon = STATUS_CONFIG[order.status]?.icon || Clock;
                            const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card/50 border border-border rounded-xl p-6 hover:border-border transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="font-bold text-lg">{order.fullName}</h3>
                                                <Badge className={`${statusConfig.color} border`}>
                                                    <StatusIcon className="w-3 h-3 ml-1" />
                                                    {statusConfig.label}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{order.email}</span>
                                                </div>
                                                {order.company && (
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4" />
                                                        <span>{order.company}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span>{order.budget}</span>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                <span>{formatDate(order.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(order.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h2 className="text-xl font-bold">تفاصيل الطلب</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">الاسم الكامل</label>
                                    <p className="font-medium">{selectedOrder.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">البريد الإلكتروني</label>
                                    <p className="font-medium">{selectedOrder.email}</p>
                                </div>
                                {selectedOrder.company && (
                                    <div>
                                        <label className="text-xs text-muted-foreground block mb-1">الشركة</label>
                                        <p className="font-medium">{selectedOrder.company}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">الخدمة</label>
                                    <p className="font-medium">{selectedOrder.service}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">الميزانية</label>
                                    <p className="font-medium">{selectedOrder.budget}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">تاريخ الطلب</label>
                                    <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground block mb-1">وصف المشروع</label>
                                <p className="bg-muted/50 rounded-xl p-4 text-slate-300">
                                    {selectedOrder.details || 'لم يتم تقديم وصف'}
                                </p>
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground block mb-2">تحديث الحالة</label>
                                <div className="flex flex-wrap gap-2">
                                    {(Object.keys(STATUS_CONFIG) as Order['status'][]).map((status) => {
                                        const config = STATUS_CONFIG[status];
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                                                disabled={updating || selectedOrder.status === status}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedOrder.status === status
                                                        ? config.color + ' border'
                                                        : 'bg-muted text-muted-foreground hover:bg-slate-700'
                                                    }`}
                                            >
                                                {config.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
