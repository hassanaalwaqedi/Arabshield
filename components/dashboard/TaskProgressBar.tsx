/**
 * Task Progress Bar Component
 * Displays task completion progress for a project
 */

'use client';

import { Task } from '@/lib/useDashboardData';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface TaskProgressBarProps {
    tasks: Task[];
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function TaskProgressBar({
    tasks,
    showLabel = true,
    size = 'md',
    className = ''
}: TaskProgressBarProps) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const heights = {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3'
    };

    if (totalTasks === 0) {
        return (
            <div className={`${className}`}>
                {showLabel && (
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">المهام</span>
                        <span className="text-muted-foreground">لا توجد مهام</span>
                    </div>
                )}
                <div className={`${heights[size]} bg-slate-100 rounded-full overflow-hidden`}>
                    <div className="h-full w-0 bg-slate-200 rounded-full" />
                </div>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            {showLabel && (
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600 flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-green-500" />
                        <span>تقدم المهام</span>
                    </span>
                    <span className="font-bold text-slate-900">
                        {completedTasks}/{totalTasks}
                        <span className="text-muted-foreground font-normal mr-1">({progress}%)</span>
                    </span>
                </div>
            )}
            <div className={`${heights[size]} bg-slate-100 rounded-full overflow-hidden`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${progress === 100
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600'
                        }`}
                />
            </div>
            {showLabel && (
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span>قيد الانتظار: {tasks.filter(t => t.status === 'todo').length}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>جاري: {tasks.filter(t => t.status === 'in-progress').length}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span>مكتمل: {completedTasks}</span>
                    </span>
                </div>
            )}
        </div>
    );
}
