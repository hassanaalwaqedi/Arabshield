/**
 * Admin Users Management Page
 * Owner/Admin only: Manages all system users
 * REAL Firestore integration - no mock data
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { isAdminRole, AdminUser, ADMIN_ROLES, UserRole } from '@/lib/admin';
import {
    Users, Loader2, AlertCircle, Shield, Search,
    Edit2, Save, X, Crown, User, Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
    const router = useRouter();
    const { user, loading: authLoading, role } = useAuth();

    // Users state
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Edit state
    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [editRole, setEditRole] = useState<UserRole>('client');
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // UI-level role protection
    useEffect(() => {
        if (!authLoading && !isAdminRole(role)) {
            router.push('/dashboard');
        }
    }, [authLoading, role, router]);

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            if (!isAdminRole(role)) return;

            try {
                setLoading(true);
                const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
                const snapshot = await getDocs(usersQuery);

                const usersData: AdminUser[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    usersData.push({
                        uid: doc.id,
                        email: data.email || '',
                        name: data.name || 'بدون اسم',
                        role: data.role || 'client',
                        createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
                        emailVerified: data.emailVerified,
                        lastLogin: data.lastLogin?.toDate?.() || data.lastLogin,
                    });
                });

                setUsers(usersData);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching users:', err);
                setError('فشل في تحميل المستخدمين: ' + (err.message || 'خطأ غير معروف'));
            } finally {
                setLoading(false);
            }
        };

        if (role && isAdminRole(role)) {
            fetchUsers();
        }
    }, [role]);

    // Filter users by search
    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Start editing a user
    const startEdit = (userItem: AdminUser) => {
        setEditingUser(userItem.uid);
        setEditRole(userItem.role);
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingUser(null);
        setEditRole('client');
    };

    // Save user role
    const saveUserRole = async (uid: string) => {
        if (!user || uid === user.uid) {
            setFeedback({ type: 'error', message: 'لا يمكنك تغيير صلاحياتك الخاصة' });
            return;
        }

        setSaving(true);
        try {
            await updateDoc(doc(db, 'users', uid), {
                role: editRole,
            });

            // Update local state
            setUsers(prev => prev.map(u =>
                u.uid === uid ? { ...u, role: editRole } : u
            ));

            setEditingUser(null);
            setFeedback({ type: 'success', message: 'تم تحديث صلاحيات المستخدم بنجاح' });
        } catch (err: any) {
            console.error('Error updating user role:', err);
            setFeedback({ type: 'error', message: 'فشل في تحديث الصلاحيات' });
        } finally {
            setSaving(false);
        }
    };

    // Clear feedback after 3 seconds
    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => setFeedback(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    // Show loading while checking auth
    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Access denied
    if (!isAdminRole(role)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg text-red-600">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            </div>
        );
    }

    // Get role badge color
    const getRoleBadge = (userRole: UserRole) => {
        switch (userRole) {
            case 'owner':
                return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full flex items-center gap-1"><Crown size={12} /> مالك</span>;
            case 'admin':
                return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full flex items-center gap-1"><Shield size={12} /> مدير</span>;
            case 'member':
                return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">عضو</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">عميل</span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                    <Users className="w-6 h-6 text-foreground" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة المستخدمين</h1>
                    <p className="text-slate-600">عرض وإدارة جميع مستخدمي النظام ({users.length} مستخدم)</p>
                </div>
            </motion.div>

            {/* Admin Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg w-fit">
                <Shield size={16} className="text-amber-600" />
                <span className="text-sm font-medium text-amber-700">صفحة مخصصة للمسؤولين فقط</span>
            </div>

            {/* Feedback */}
            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${feedback.type === 'success'
                            ? 'bg-green-50 border border-green-200 text-green-700'
                            : 'bg-red-50 border border-red-200 text-red-700'
                        }`}
                >
                    {feedback.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    <span>{feedback.message}</span>
                </motion.div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    placeholder="البحث عن مستخدم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">المستخدم</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">البريد</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">الصلاحية</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">تاريخ الإنشاء</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        {searchQuery ? 'لا توجد نتائج للبحث' : 'لا يوجد مستخدمين'}
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((userItem) => (
                                    <tr key={userItem.uid} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-foreground font-bold">
                                                    {userItem.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{userItem.name}</p>
                                                    <p className="text-xs text-muted-foreground">{userItem.uid.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700">{userItem.email}</td>
                                        <td className="px-6 py-4">
                                            {editingUser === userItem.uid ? (
                                                <select
                                                    value={editRole}
                                                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                                                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                >
                                                    <option value="client">عميل</option>
                                                    <option value="member">عضو</option>
                                                    <option value="admin">مدير</option>
                                                    <option value="owner">مالك</option>
                                                </select>
                                            ) : (
                                                getRoleBadge(userItem.role)
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground text-sm">
                                            {new Date(userItem.createdAt).toLocaleDateString('ar-SA')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {userItem.uid === user?.uid ? (
                                                <span className="text-xs text-muted-foreground">أنت</span>
                                            ) : editingUser === userItem.uid ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => saveUserRole(userItem.uid)}
                                                        disabled={saving}
                                                        className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                                                    >
                                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEdit(userItem)}
                                                    className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
