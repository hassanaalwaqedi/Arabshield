/**
 * Settings Dashboard Page
 * User profile and application settings
 */

'use client';

import { useState } from 'react';
import { User, Mail, Bell, Shield, Save, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Settings state
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        weeklyReport: true,
        marketingEmails: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('تم حفظ الإعدادات بنجاح');
        setSaving(false);
    };

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

            {/* Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الملف الشخصي</h2>
                </div>

                <div className="space-y-4">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.displayName?.charAt(0) || 'U'}
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                            <Upload size={16} />
                            <span className="text-sm">تحميل صورة</span>
                        </button>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            الاسم
                        </label>
                        <input
                            type="text"
                            defaultValue={user?.displayName || 'مستخدم'}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            defaultValue={user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                        />
                        <p className="text-xs text-slate-500 mt-1">لا يمكن تغيير البريد الإلكتروني</p>
                    </div>
                </div>
            </motion.div>

            {/* Notifications Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الإشعارات</h2>
                </div>

                <div className="space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'إشعارات البريد الإلكتروني', desc: 'تلقي التحديثات عبر البريد' },
                        { key: 'pushNotifications', label: 'الإشعارات الفورية', desc: 'إشعارات المتصفح' },
                        { key: 'weeklyReport', label: 'التقرير الأسبوعي', desc: 'ملخص أسبوعي للمشاريع' },
                        { key: 'marketingEmails', label: 'الرسائل التسويقية', desc: 'العروض والأخبار' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                            <div>
                                <p className="font-medium text-slate-900">{item.label}</p>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings[item.key as keyof typeof settings]}
                                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Security Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">الأمان</h2>
                </div>

                <div className="space-y-3">
                    <button className="w-full text-right px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200">
                        تغيير كلمة المرور
                    </button>
                    <button className="w-full text-right px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200">
                        المصادقة الثنائية
                    </button>
                    <button className="w-full text-right px-4 py-3 rounded-xl hover:bg-red-50 transition-colors border border-red-200 text-red-600">
                        حذف الحساب
                    </button>
                </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
            >
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save size={20} />
                    )}
                    <span>{saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                </button>
            </motion.div>
        </div>
    );
}
