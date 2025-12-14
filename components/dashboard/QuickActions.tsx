/**
 * Quick Actions Component
 * Provides quick access buttons for common dashboard actions
 */

'use client';

import { Plus, FileText, Download, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickAction {
    icon: React.ElementType;
    label: string;
    description: string;
    gradient: string;
    onClick: () => void;
}

export default function QuickActions() {
    const actions: QuickAction[] = [
        {
            icon: Plus,
            label: 'مشروع جديد',
            description: 'إنشاء مشروع جديد',
            gradient: 'from-blue-600 to-purple-600',
            onClick: () => alert('سيتم فتح نموذج إنشاء مشروع'),
        },
        {
            icon: FileText,
            label: 'فاتورة جديدة',
            description: 'إصدار فاتورة',
            gradient: 'from-green-600 to-emerald-600',
            onClick: () => alert('سيتم فتح نموذج إنشاء فاتورة'),
        },
        {
            icon: MessageSquare,
            label: 'تذكرة دعم',
            description: 'طلب دعم فني',
            gradient: 'from-orange-600 to-red-600',
            onClick: () => window.location.href = '/dashboard/support',
        },
        {
            icon: Download,
            label: 'تقرير شامل',
            description: 'تحميل التقارير',
            gradient: 'from-cyan-600 to-blue-600',
            onClick: () => alert('سيتم تنزيل التقرير'),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action, index) => (
                <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={action.onClick}
                    className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all group text-right"
                >
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

                    <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg mb-4`}>
                            <action.icon className="w-6 h-6 text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-1">{action.label}</h3>
                        <p className="text-sm text-slate-600">{action.description}</p>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}
