/**
 * Settings Dashboard Page
 * PRODUCTION: Real user profile and application settings
 * All settings are persisted to Firestore and enforced
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Mail, Bell, Shield, Save, Check, X, AlertCircle, Loader2, Lock, LogOut, RefreshCw, Upload, Trash2, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, getDoc, serverTimestamp, deleteDoc, collection, getDocs } from 'firebase/firestore';
import {
    updateProfile,
    updatePassword,
    sendEmailVerification,
    reauthenticateWithCredential,
    EmailAuthProvider,
    signOut,
    deleteUser
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Feedback component for success/error messages
function Feedback({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
                }`}
        >
            {type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            <span className="flex-1">{message}</span>
            <button onClick={onClose} className="p-1 hover:opacity-70">
                <X size={16} />
            </button>
        </motion.div>
    );
}

// Toggle component for settings
function SettingsToggle({
    enabled,
    onChange,
    loading = false,
    disabled = false
}: {
    enabled: boolean;
    onChange: (v: boolean) => void;
    loading?: boolean;
    disabled?: boolean;
}) {
    return (
        <button
            onClick={() => !disabled && !loading && onChange(!enabled)}
            disabled={disabled || loading}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                </div>
            ) : (
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? 'right-1' : 'left-1'
                    }`} />
            )}
        </button>
    );
}

export default function SettingsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const {
        preferences,
        loading: prefsLoading,
        saving: prefsSaving,
        updatePreference,
        uploadAvatar,
        deleteAvatar
    } = useUserSettings();

    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile state
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [saving, setSaving] = useState(false);

    // Avatar upload state
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    // Password change state
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    // Account deletion state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    // Verification state
    const [sendingVerification, setSendingVerification] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);

    // Notification toggle loading states
    const [togglingEmail, setTogglingEmail] = useState(false);
    const [togglingPush, setTogglingPush] = useState(false);
    const [togglingWeekly, setTogglingWeekly] = useState(false);
    const [togglingMarketing, setTogglingMarketing] = useState(false);

    // Feedback state
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Load user data
    useEffect(() => {
        const loadUserData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name || user.displayName || '');
                    setOriginalName(userData.name || user.displayName || '');
                } else {
                    setName(user.displayName || '');
                    setOriginalName(user.displayName || '');
                }
            } catch (err) {
                console.error('Error loading user data:', err);
                setName(user.displayName || '');
                setOriginalName(user.displayName || '');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [user]);

    const hasChanges = name !== originalName;

    // Handle profile save
    const handleSaveProfile = async () => {
        if (!user) return;

        if (!name.trim()) {
            setFeedback({ type: 'error', message: 'الاسم لا يمكن أن يكون فارغاً' });
            return;
        }

        setSaving(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: name.trim(),
                updatedAt: serverTimestamp()
            });

            await updateProfile(user, {
                displayName: name.trim()
            });

            setOriginalName(name.trim());
            setFeedback({ type: 'success', message: 'تم حفظ التغييرات بنجاح' });
        } catch (err: any) {
            console.error('Error saving profile:', err);
            setFeedback({ type: 'error', message: 'حدث خطأ أثناء حفظ التغييرات' });
        } finally {
            setSaving(false);
        }
    };

    // Handle avatar upload
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingAvatar(true);
        try {
            await uploadAvatar(file);
            setFeedback({ type: 'success', message: 'تم رفع الصورة بنجاح' });
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'فشل في رفع الصورة' });
        } finally {
            setUploadingAvatar(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Handle avatar delete
    const handleDeleteAvatar = async () => {
        setUploadingAvatar(true);
        try {
            await deleteAvatar();
            setFeedback({ type: 'success', message: 'تم حذف الصورة بنجاح' });
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'فشل في حذف الصورة' });
        } finally {
            setUploadingAvatar(false);
        }
    };

    // Handle notification toggle
    const handleNotificationToggle = async (
        key: 'emailNotifications' | 'pushNotifications' | 'weeklyReport' | 'marketingEmails',
        value: boolean,
        setLoading: (v: boolean) => void
    ) => {
        setLoading(true);
        try {
            await updatePreference(key, value);
            setFeedback({ type: 'success', message: 'تم تحديث الإعداد' });
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'فشل في تحديث الإعداد' });
        } finally {
            setLoading(false);
        }
    };

    // Handle resend verification email
    const handleResendVerification = async () => {
        if (!user || user.emailVerified) return;

        setSendingVerification(true);
        try {
            await sendEmailVerification(user);
            setVerificationSent(true);
            setFeedback({ type: 'success', message: 'تم إرسال رابط التحقق إلى بريدك الإلكتروني' });
        } catch (err: any) {
            console.error('Error sending verification:', err);
            if (err.code === 'auth/too-many-requests') {
                setFeedback({ type: 'error', message: 'الرجاء الانتظار قبل إعادة الإرسال' });
            } else {
                setFeedback({ type: 'error', message: 'حدث خطأ أثناء إرسال رابط التحقق' });
            }
        } finally {
            setSendingVerification(false);
        }
    };

    // Handle password change
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.email) return;

        if (newPassword !== confirmPassword) {
            setFeedback({ type: 'error', message: 'كلمات المرور غير متطابقة' });
            return;
        }

        if (newPassword.length < 6) {
            setFeedback({ type: 'error', message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
            return;
        }

        setChangingPassword(true);
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);

            setShowPasswordModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setFeedback({ type: 'success', message: 'تم تغيير كلمة المرور بنجاح' });
        } catch (err: any) {
            console.error('Error changing password:', err);
            if (err.code === 'auth/wrong-password') {
                setFeedback({ type: 'error', message: 'كلمة المرور الحالية غير صحيحة' });
            } else if (err.code === 'auth/weak-password') {
                setFeedback({ type: 'error', message: 'كلمة المرور ضعيفة جداً' });
            } else if (err.code === 'auth/requires-recent-login') {
                setFeedback({ type: 'error', message: 'الرجاء تسجيل الخروج وإعادة تسجيل الدخول ثم المحاولة مرة أخرى' });
            } else {
                setFeedback({ type: 'error', message: 'حدث خطأ أثناء تغيير كلمة المرور' });
            }
        } finally {
            setChangingPassword(false);
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.email) return;

        if (deleteConfirmText !== 'حذف حسابي') {
            setFeedback({ type: 'error', message: 'الرجاء كتابة "حذف حسابي" للتأكيد' });
            return;
        }

        setDeletingAccount(true);
        try {
            // Re-authenticate
            const credential = EmailAuthProvider.credential(user.email, deletePassword);
            await reauthenticateWithCredential(user, credential);

            const uid = user.uid;

            // Log to audit before deletion
            await updateDoc(doc(db, 'audit_logs', `delete_${uid}_${Date.now()}`), {
                action: 'account_deleted',
                userId: uid,
                userEmail: user.email,
                timestamp: serverTimestamp(),
                self_initiated: true
            }).catch(() => { }); // Ignore if fails

            // Delete user's subcollections (settings, notifications, etc.)
            const settingsRef = collection(db, 'users', uid, 'settings');
            const settingsDocs = await getDocs(settingsRef);
            for (const docSnap of settingsDocs.docs) {
                await deleteDoc(docSnap.ref);
            }

            // Delete user document
            await deleteDoc(doc(db, 'users', uid));

            // Delete auth account (this will sign out the user)
            await deleteUser(user);

            // Redirect to homepage
            router.push('/');
        } catch (err: any) {
            console.error('Error deleting account:', err);
            if (err.code === 'auth/wrong-password') {
                setFeedback({ type: 'error', message: 'كلمة المرور غير صحيحة' });
            } else if (err.code === 'auth/requires-recent-login') {
                setFeedback({ type: 'error', message: 'الرجاء تسجيل الخروج وإعادة تسجيل الدخول ثم المحاولة مرة أخرى' });
            } else {
                setFeedback({ type: 'error', message: 'حدث خطأ أثناء حذف الحساب' });
            }
        } finally {
            setDeletingAccount(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (err) {
            console.error('Error signing out:', err);
            setFeedback({ type: 'error', message: 'حدث خطأ أثناء تسجيل الخروج' });
        }
    };

    // Get avatar display
    const avatarUrl = preferences.avatarUrl || user?.photoURL;
    const avatarInitial = (name || user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

    if (loading || prefsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-slate-900 mb-2">الإعدادات</h1>
                <p className="text-slate-600">إدارة حسابك وتفضيلاتك</p>
            </motion.div>

            {/* Feedback Message */}
            {feedback && (
                <Feedback
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => setFeedback(null)}
                />
            )}

            {/* Account Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الحساب</h2>
                </div>

                <div className="space-y-4">
                    {/* Email with Verification Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            البريد الإلكتروني
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="flex-1 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                            />
                            {user?.emailVerified ? (
                                <span className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                    <Check size={16} />
                                    موثق
                                </span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                                        <AlertCircle size={16} />
                                        غير موثق
                                    </span>
                                    <button
                                        onClick={handleResendVerification}
                                        disabled={sendingVerification || verificationSent}
                                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors disabled:opacity-50"
                                    >
                                        {sendingVerification ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <RefreshCw size={16} />
                                        )}
                                        {verificationSent ? 'تم الإرسال' : 'إرسال رابط التحقق'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">لا يمكن تغيير البريد الإلكتروني</p>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Profile Section with Avatar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الملف الشخصي</h2>
                </div>

                <div className="space-y-4">
                    {/* Avatar - REAL upload */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {avatarInitial}
                                </div>
                            )}
                            {uploadingAvatar && (
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleAvatarUpload}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadingAvatar}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                            >
                                <Camera size={16} />
                                <span className="text-sm">تحميل صورة</span>
                            </button>
                            {avatarUrl && (
                                <button
                                    onClick={handleDeleteAvatar}
                                    disabled={uploadingAvatar}
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <Trash2 size={16} />
                                    <span className="text-sm">حذف الصورة</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Name - Editable */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            الاسم <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="أدخل اسمك"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Notifications Section - REAL toggles */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الإشعارات</h2>
                </div>

                <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div>
                            <p className="font-medium text-slate-900">إشعارات البريد الإلكتروني</p>
                            <p className="text-sm text-slate-500">تلقي التحديثات عبر البريد</p>
                        </div>
                        <SettingsToggle
                            enabled={preferences.emailNotifications}
                            onChange={(v) => handleNotificationToggle('emailNotifications', v, setTogglingEmail)}
                            loading={togglingEmail}
                        />
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div>
                            <p className="font-medium text-slate-900">الإشعارات الفورية</p>
                            <p className="text-sm text-slate-500">إشعارات المتصفح</p>
                        </div>
                        <SettingsToggle
                            enabled={preferences.pushNotifications}
                            onChange={(v) => handleNotificationToggle('pushNotifications', v, setTogglingPush)}
                            loading={togglingPush}
                        />
                    </div>

                    {/* Weekly Report */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div>
                            <p className="font-medium text-slate-900">التقرير الأسبوعي</p>
                            <p className="text-sm text-slate-500">ملخص أسبوعي للمشاريع</p>
                        </div>
                        <SettingsToggle
                            enabled={preferences.weeklyReport}
                            onChange={(v) => handleNotificationToggle('weeklyReport', v, setTogglingWeekly)}
                            loading={togglingWeekly}
                        />
                    </div>

                    {/* Marketing Emails */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div>
                            <p className="font-medium text-slate-900">الرسائل التسويقية</p>
                            <p className="text-sm text-slate-500">العروض والأخبار</p>
                        </div>
                        <SettingsToggle
                            enabled={preferences.marketingEmails}
                            onChange={(v) => handleNotificationToggle('marketingEmails', v, setTogglingMarketing)}
                            loading={togglingMarketing}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Security Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الأمان</h2>
                </div>

                <div className="space-y-3">
                    {/* Change Password - Real */}
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200"
                    >
                        <div className="flex items-center gap-3">
                            <Lock size={18} className="text-slate-500" />
                            <span>تغيير كلمة المرور</span>
                        </div>
                        <span className="text-slate-400">←</span>
                    </button>

                    {/* 2FA - Coming Soon but honest */}
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 opacity-60">
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-slate-400" />
                            <span className="text-slate-500">المصادقة الثنائية (2FA)</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">قيد التطوير</span>
                    </div>

                    {/* Delete Account - Real */}
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Trash2 size={18} className="text-red-500" />
                            <span className="text-red-600">حذف الحساب نهائياً</span>
                        </div>
                        <span className="text-red-400">←</span>
                    </button>
                </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end"
            >
                <button
                    onClick={handleSaveProfile}
                    disabled={saving || !hasChanges}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Save size={20} />
                    )}
                    <span>{saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                </button>
            </motion.div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full relative"
                    >
                        <button
                            onClick={() => {
                                setShowPasswordModal(false);
                                setCurrentPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                            }}
                            className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-slate-500" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Lock className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">تغيير كلمة المرور</h2>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    كلمة المرور الحالية
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    كلمة المرور الجديدة
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <p className="text-xs text-slate-500 mt-1">6 أحرف على الأقل</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    تأكيد كلمة المرور الجديدة
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
                                    disabled={changingPassword}
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {changingPassword ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>جاري التغيير...</span>
                                        </>
                                    ) : (
                                        <span>تغيير</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Account Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full relative"
                    >
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setDeletePassword('');
                                setDeleteConfirmText('');
                            }}
                            className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-slate-500" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-red-600">حذف الحساب نهائياً</h2>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-red-700 font-medium mb-2">⚠️ تحذير: هذا الإجراء لا يمكن التراجع عنه!</p>
                            <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                                <li>سيتم حذف جميع بياناتك الشخصية</li>
                                <li>سيتم حذف مشاريعك وملفاتك</li>
                                <li>لن تتمكن من استعادة الحساب</li>
                            </ul>
                        </div>

                        <form onSubmit={handleDeleteAccount} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    أدخل كلمة المرور للتأكيد
                                </label>
                                <input
                                    type="password"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    اكتب "حذف حسابي" للتأكيد
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    required
                                    placeholder="حذف حسابي"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
                                    disabled={deletingAccount}
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={deletingAccount || deleteConfirmText !== 'حذف حسابي'}
                                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {deletingAccount ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>جاري الحذف...</span>
                                        </>
                                    ) : (
                                        <span>حذف الحساب</span>
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
