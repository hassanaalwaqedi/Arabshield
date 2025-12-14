/**
 * Settings Dashboard Page
 * Real user profile and application settings
 * Phase 3: De-mocked - All settings are functional or explicitly disabled
 */

'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Bell, Shield, Save, Check, X, AlertCircle, Loader2, Lock, LogOut, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import {
    updateProfile,
    updatePassword,
    sendEmailVerification,
    reauthenticateWithCredential,
    EmailAuthProvider,
    signOut
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

// Disabled feature card component
function DisabledFeature({ label, description, reason }: { label: string; description: string; reason: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 opacity-60">
            <div>
                <p className="font-medium text-slate-600">{label}</p>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-slate-200 text-slate-600 rounded-full">{reason}</span>
                <div className="w-11 h-6 bg-slate-300 rounded-full opacity-50 cursor-not-allowed"></div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Profile state
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [saving, setSaving] = useState(false);

    // Password change state
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    // Verification state
    const [sendingVerification, setSendingVerification] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);

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
                // Get user profile from Firestore
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

    // Check if there are unsaved changes
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
            // Update Firestore
            await updateDoc(doc(db, 'users', user.uid), {
                name: name.trim(),
                updatedAt: serverTimestamp()
            });

            // Update Firebase Auth profile
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
            // Re-authenticate user first
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update password
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

    if (loading) {
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
                            <span>تسجيل الخروج من جميع الأجهزة</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Profile Section */}
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
                    {/* Avatar - Disabled */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-400 cursor-not-allowed"
                            >
                                <span className="text-sm">تحميل صورة</span>
                            </button>
                            <span className="text-xs px-2 py-1 bg-slate-200 text-slate-500 rounded-full">قريباً</span>
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

            {/* Notifications Section - All Disabled */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-900">الإشعارات</h2>
                    </div>
                    <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                        <Info size={12} />
                        المرحلة الرابعة
                    </span>
                </div>

                <div className="space-y-3">
                    <DisabledFeature
                        label="إشعارات البريد الإلكتروني"
                        description="تلقي التحديثات عبر البريد"
                        reason="قريباً"
                    />
                    <DisabledFeature
                        label="الإشعارات الفورية"
                        description="إشعارات المتصفح"
                        reason="قريباً"
                    />
                    <DisabledFeature
                        label="التقرير الأسبوعي"
                        description="ملخص أسبوعي للمشاريع"
                        reason="قريباً"
                    />
                    <DisabledFeature
                        label="الرسائل التسويقية"
                        description="العروض والأخبار"
                        reason="قريباً"
                    />
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

                    {/* 2FA - Disabled */}
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 opacity-60">
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-slate-400" />
                            <span className="text-slate-500">المصادقة الثنائية</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-slate-200 text-slate-500 rounded-full">Enterprise</span>
                    </div>

                    {/* Delete Account - Disabled */}
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-50/50 border border-red-200 opacity-60">
                        <div className="flex items-center gap-3">
                            <X size={18} className="text-red-400" />
                            <span className="text-red-400">حذف الحساب</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-500 rounded-full">تواصل مع الدعم</span>
                    </div>
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
        </div>
    );
}
