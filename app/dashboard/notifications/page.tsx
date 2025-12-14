'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Bell, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function NotificationsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-abyss-50 via-electric-50/20 to-cyan-50/30 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-abyss-600 hover:text-electric-600 transition-colors mb-4"
                    >
                        <ArrowRight className="h-4 w-4" />
                        <span>رجوع</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-electric-500 to-cyan-600 p-3 rounded-2xl shadow-lg">
                            <Bell className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-abyss-900">الإشعارات</h1>
                            <p className="text-abyss-600">تابع آخر التحديثات</p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-abyss-200/50 p-12 text-center">
                    <div className="bg-abyss-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bell className="h-10 w-10 text-abyss-400" />
                    </div>
                    <h2 className="text-xl font-bold text-abyss-900 mb-2">لا توجد إشعارات</h2>
                    <p className="text-abyss-600 mb-6">
                        ستظهر هنا الإشعارات عند وجود تحديثات جديدة
                    </p>
                    <div className="text-sm text-abyss-500 bg-abyss-50 px-4 py-2 rounded-xl inline-block">
                        <Clock className="h-4 w-4 inline-block ml-2" />
                        نظام الإشعارات قيد التطوير
                    </div>
                </div>
            </div>
        </div>
    );
}
