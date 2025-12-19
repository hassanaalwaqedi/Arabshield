"use client";

/**
 * Admin Contact Messages Management Page
 * View and manage incoming contact messages
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
    Mail,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Clock,
    MessageSquare,
    Trash2,
    Eye,
    X,
    MailOpen,
    Reply
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    createdAt: Timestamp;
}

const STATUS_CONFIG = {
    unread: { label: 'غير مقروءة', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Mail },
    read: { label: 'مقروءة', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: MailOpen },
    replied: { label: 'تم الرد', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: Reply },
};

export default function AdminMessagesPage() {
    const router = useRouter();
    const { role, loading: authLoading } = useAuth();

    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [updating, setUpdating] = useState(false);

    // Fetch messages
    useEffect(() => {
        if (authLoading) return;

        if (!isAdminRole(role)) {
            router.push('/dashboard');
            return;
        }

        const fetchMessages = async () => {
            try {
                const messagesRef = collection(db, 'contact_messages');
                const q = query(messagesRef, orderBy('createdAt', 'desc'));
                const snapshot = await getDocs(q);

                const messagesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as ContactMessage[];

                setMessages(messagesData);
            } catch (err: any) {
                console.error('Error fetching messages:', err);
                setError('فشل في تحميل الرسائل');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [authLoading, role, router]);

    // Update message status
    const handleStatusUpdate = async (messageId: string, newStatus: ContactMessage['status']) => {
        setUpdating(true);
        try {
            await updateDoc(doc(db, 'contact_messages', messageId), { status: newStatus });
            setMessages(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, status: newStatus } : msg
            ));
            if (selectedMessage?.id === messageId) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (err) {
            console.error('Error updating message:', err);
            setError('فشل في تحديث حالة الرسالة');
        } finally {
            setUpdating(false);
        }
    };

    // Delete message
    const handleDelete = async (messageId: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;

        try {
            await deleteDoc(doc(db, 'contact_messages', messageId));
            setMessages(prev => prev.filter(msg => msg.id !== messageId));
            setSelectedMessage(null);
        } catch (err) {
            console.error('Error deleting message:', err);
            setError('فشل في حذف الرسالة');
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

    // Mark as read when viewing
    const handleView = async (message: ContactMessage) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            await handleStatusUpdate(message.id, 'read');
        }
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

    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">
            {/* Header */}
            <div className="border-b border-border bg-card/50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">الرسائل الواردة</h1>
                            <p className="text-muted-foreground text-sm">
                                {messages.length} رسالة
                                {unreadCount > 0 && (
                                    <span className="text-yellow-400 mr-2">({unreadCount} غير مقروءة)</span>
                                )}
                            </p>
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

                {messages.length === 0 ? (
                    <div className="text-center py-20">
                        <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">لا توجد رسائل بعد</h3>
                        <p className="text-muted-foreground">ستظهر الرسائل هنا عند استلامها</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {messages.map((message, index) => {
                            const StatusIcon = STATUS_CONFIG[message.status]?.icon || Mail;
                            const statusConfig = STATUS_CONFIG[message.status] || STATUS_CONFIG.unread;

                            return (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`bg-card/50 border rounded-xl p-6 hover:border-border transition-colors cursor-pointer ${message.status === 'unread' ? 'border-yellow-500/30' : 'border-border'
                                        }`}
                                    onClick={() => handleView(message)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-lg">{message.name}</h3>
                                                <Badge className={`${statusConfig.color} border`}>
                                                    <StatusIcon className="w-3 h-3 ml-1" />
                                                    {statusConfig.label}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <Mail className="w-4 h-4" />
                                                <span>{message.email}</span>
                                            </div>

                                            {message.subject && (
                                                <p className="text-slate-300 font-medium mb-1">{message.subject}</p>
                                            )}

                                            <p className="text-muted-foreground text-sm line-clamp-2">{message.message}</p>

                                            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                <span>{formatDate(message.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleView(message)}
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(message.id)}
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

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h2 className="text-xl font-bold">تفاصيل الرسالة</h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">الاسم</label>
                                    <p className="font-medium">{selectedMessage.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">البريد الإلكتروني</label>
                                    <a href={`mailto:${selectedMessage.email}`} className="font-medium text-blue-400 hover:underline">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                {selectedMessage.subject && (
                                    <div className="col-span-2">
                                        <label className="text-xs text-muted-foreground block mb-1">الموضوع</label>
                                        <p className="font-medium">{selectedMessage.subject}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-muted-foreground block mb-1">تاريخ الإرسال</label>
                                    <p className="font-medium">{formatDate(selectedMessage.createdAt)}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground block mb-1">الرسالة</label>
                                <p className="bg-muted/50 rounded-xl p-4 text-slate-300 whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground block mb-2">تحديث الحالة</label>
                                <div className="flex flex-wrap gap-2">
                                    {(Object.keys(STATUS_CONFIG) as ContactMessage['status'][]).map((status) => {
                                        const config = STATUS_CONFIG[status];
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(selectedMessage.id, status)}
                                                disabled={updating || selectedMessage.status === status}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedMessage.status === status
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

                            <div className="pt-4 border-t border-border">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'رسالتك في NovaArab'}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                                >
                                    <Reply className="w-4 h-4" />
                                    الرد عبر البريد
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
