/**
 * Admin System Settings Page
 * Owner/Admin only: System-wide configuration
 * REAL Firestore integration - no mock data
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { isAdminRole, SystemSettings, DEFAULT_SYSTEM_SETTINGS } from '@/lib/admin';
import {
    Settings, Loader2, AlertCircle, Shield, Save,
    Check, ToggleLeft, ToggleRight, Server, Database, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

// Settings document path
const SETTINGS_DOC = 'system/settings';

export default function AdminSettingsPage() {
    const router = useRouter();
    const { user, loading: authLoading, role } = useAuth();

    // Settings state
    const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalSettings, setOriginalSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);

    // UI-level role protection
    useEffect(() => {
        if (!authLoading && !isAdminRole(role)) {
            router.push('/dashboard');
        }
    }, [authLoading, role, router]);

    // Fetch settings from Firestore
    useEffect(() => {
        const fetchSettings = async () => {
            if (!isAdminRole(role)) return;

            try {
                setLoading(true);
                const settingsDoc = await getDoc(doc(db, 'system', 'settings'));

                if (settingsDoc.exists()) {
                    const data = settingsDoc.data() as SystemSettings;
                    setSettings(data);
                    setOriginalSettings(data);
                } else {
                    // Initialize with defaults if doesn't exist
                    setSettings(DEFAULT_SYSTEM_SETTINGS);
                    setOriginalSettings(DEFAULT_SYSTEM_SETTINGS);
                }

                setError(null);
            } catch (err: any) {
                console.error('Error fetching settings:', err);
                setError('فشل في تحميل الإعدادات: ' + (err.message || 'خطأ غير معروف'));
            } finally {
                setLoading(false);
            }
        };

        if (role && isAdminRole(role)) {
            fetchSettings();
        }
    }, [role]);

    // Track changes
    useEffect(() => {
        const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
        setHasChanges(changed);
    }, [settings, originalSettings]);

    // Save settings to Firestore
    const saveSettings = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'system', 'settings'), {
                ...settings,
                updatedAt: serverTimestamp(),
                updatedBy: user?.uid,
            });

            setOriginalSettings(settings);
            setHasChanges(false);
            setFeedback({ type: 'success', message: 'تم حفظ الإعدادات بنجاح' });
        } catch (err: any) {
            console.error('Error saving settings:', err);
            setFeedback({ type: 'error', message: 'فشل في حفظ الإعدادات' });
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

    // Update a setting
    const updateSetting = <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

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

    // Toggle component
    const Toggle = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) => (
        <button
            onClick={() => !disabled && onChange(!enabled)}
            disabled={disabled}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? 'right-1' : 'left-1'
                }`} />
        </button>
    );

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">إعدادات النظام</h1>
                        <p className="text-slate-600">إدارة إعدادات النظام والتكوين</p>
                    </div>
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

            {/* General Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Server className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">إعدادات عامة</h2>
                </div>

                <div className="space-y-6">
                    {/* Site Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            اسم الموقع
                        </label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => updateSetting('siteName', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Maintenance Mode */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p className="font-medium text-slate-900">وضع الصيانة</p>
                            <p className="text-sm text-slate-600">تعطيل الوصول للمستخدمين مؤقتاً</p>
                        </div>
                        <Toggle
                            enabled={settings.maintenanceMode}
                            onChange={(v) => updateSetting('maintenanceMode', v)}
                        />
                    </div>

                    {/* Allow Registrations */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p className="font-medium text-slate-900">السماح بالتسجيل</p>
                            <p className="text-sm text-slate-600">السماح للمستخدمين الجدد بالتسجيل</p>
                        </div>
                        <Toggle
                            enabled={settings.allowNewRegistrations}
                            onChange={(v) => updateSetting('allowNewRegistrations', v)}
                        />
                    </div>
                </div>
            </motion.div>

            {/* User Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Database className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">إعدادات المستخدمين</h2>
                </div>

                <div className="space-y-6">
                    {/* Default User Role */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            الصلاحية الافتراضية للمستخدمين الجدد
                        </label>
                        <select
                            value={settings.defaultUserRole}
                            onChange={(e) => updateSetting('defaultUserRole', e.target.value as any)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="client">عميل</option>
                            <option value="member">عضو</option>
                        </select>
                    </div>

                    {/* Max Projects */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            الحد الأقصى للمشاريع لكل مستخدم
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={100}
                            value={settings.maxProjectsPerUser}
                            onChange={(e) => updateSetting('maxProjectsPerUser', parseInt(e.target.value) || 10)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">إعدادات الإشعارات</h2>
                </div>

                <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl opacity-60">
                        <div>
                            <p className="font-medium text-slate-900">إشعارات البريد الإلكتروني</p>
                            <p className="text-sm text-slate-600">إرسال إشعارات للمستخدمين عبر البريد</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">قريباً</span>
                            <Toggle
                                enabled={settings.emailNotificationsEnabled}
                                onChange={(v) => updateSetting('emailNotificationsEnabled', v)}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-end"
            >
                <button
                    onClick={saveSettings}
                    disabled={saving || !hasChanges}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Save size={20} />
                    )}
                    <span>{saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}</span>
                </button>
            </motion.div>
        </div>
    );
}
