/**
 * Task Card Component
 * Displays individual task with status, deadline, and actions
 */

'use client';

import { Task } from '@/lib/useDashboardData';
import { motion } from 'framer-motion';
import {
    MoreVertical,
    Clock,
    CheckCircle,
    Circle,
    Loader2,
    Calendar,
    User,
    Trash2,
    Edit2
} from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
    task: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (taskId: string) => void;
    onToggleComplete?: (taskId: string, currentStatus: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
    const [showMenu, setShowMenu] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return 'bg-slate-100 text-slate-700';
            case 'in-progress': return 'bg-blue-100 text-blue-700';
            case 'completed': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'todo': return 'قيد الانتظار';
            case 'in-progress': return 'جاري التنفيذ';
            case 'completed': return 'مكتمل';
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'todo': return <Circle size={16} className="text-muted-foreground" />;
            case 'in-progress': return <Loader2 size={16} className="text-blue-500 animate-spin" />;
            case 'completed': return <CheckCircle size={16} className="text-green-500" />;
            default: return <Circle size={16} />;
        }
    };

    const isOverdue = () => {
        if (!task.deadline || task.status === 'completed') return false;
        return new Date(task.deadline) < new Date();
    };

    const formatDeadline = (deadline: string) => {
        const date = new Date(deadline);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className={`bg-white/70 backdrop-blur-xl rounded-xl p-5 shadow-lg border transition-all ${isOverdue() ? 'border-red-300' : 'border-slate-200'
                } hover:shadow-xl`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                    <button
                        onClick={() => onToggleComplete?.(task.id, task.status)}
                        className="mt-1 hover:scale-110 transition-transform"
                    >
                        {getStatusIcon(task.status)}
                    </button>
                    <div className="flex-1">
                        <h3 className={`text-base font-bold mb-1 ${task.status === 'completed' ? 'text-muted-foreground line-through' : 'text-slate-900'
                            }`}>
                            {task.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {getStatusLabel(task.status)}
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <MoreVertical size={18} className="text-muted-foreground" />
                    </button>

                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-10 min-w-[120px]"
                        >
                            <button
                                onClick={() => {
                                    onEdit?.(task);
                                    setShowMenu(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                <Edit2 size={14} />
                                <span>تعديل</span>
                            </button>
                            <button
                                onClick={() => {
                                    onDelete?.(task.id);
                                    setShowMenu(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={14} />
                                <span>حذف</span>
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {task.description && (
                <p className="text-sm text-slate-600 mb-3 line-clamp-2 mr-7">
                    {task.description}
                </p>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground mr-7">
                {task.deadline && (
                    <div className={`flex items-center gap-1 ${isOverdue() ? 'text-red-600' : ''}`}>
                        <Calendar size={12} />
                        <span>{formatDeadline(task.deadline)}</span>
                        {isOverdue() && <span className="text-red-600 font-medium">(متأخر)</span>}
                    </div>
                )}

                {task.assignedTo && (
                    <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{task.assignedTo}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
