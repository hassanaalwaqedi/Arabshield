/**
 * Stats Card Component
 * Displays a statistic with icon, value, and optional trend indicator
 */

'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    gradient?: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    gradient = 'from-blue-600 to-purple-600'
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">{title}</h3>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                    <Icon className="w-5 h-5 text-foreground" />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-3xl font-bold text-slate-900">{value}</p>

                {trend && (
                    <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                        <span>{trend.isPositive ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
