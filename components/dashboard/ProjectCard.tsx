/**
 * Project Card Component
 * Displays project information with progress bar, task progress, and actions
 */

'use client';

import { Project, useProjectTasks, useProjectMessages } from '@/lib/useDashboardData';
import { motion } from 'framer-motion';
import { MoreVertical, Clock, CheckCircle, CheckSquare, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { tasks } = useProjectTasks(project.id);
    const { messages } = useProjectMessages(project.id);

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const messageCount = messages.length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-blue-100 text-blue-700';
            case 'completed': return 'bg-green-100 text-green-700';
            case 'on-hold': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'نشط';
            case 'completed': return 'مكتمل';
            case 'on-hold': return 'معلق';
            default: return status;
        }
    };

    return (
        <Link href={`/dashboard/projects/${project.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all cursor-pointer"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {getStatusLabel(project.status)}
                            </span>
                            {messageCount > 0 && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    <MessageCircle size={12} />
                                    {messageCount}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={(e) => e.preventDefault()} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <MoreVertical size={20} className="text-slate-600" />
                    </button>
                </div>

                {project.description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                )}

                {/* Project Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-600">تقدم المشروع</span>
                        <span className="font-bold text-slate-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        />
                    </div>
                </div>

                {/* Task Progress Bar */}
                {totalTasks > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600 flex items-center gap-1">
                                <CheckSquare size={14} className="text-green-500" />
                                <span>المهام</span>
                            </span>
                            <span className="font-bold text-slate-900">
                                {completedTasks}/{totalTasks}
                                <span className="text-muted-foreground font-normal mr-1">({taskProgress}%)</span>
                            </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${taskProgress}%` }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                                className={`h-full rounded-full ${taskProgress === 100
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                    }`}
                            />
                        </div>
                    </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{new Date(project.createdAt).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {totalTasks > 0 && (
                            <div className="flex items-center gap-1 text-blue-600">
                                <CheckSquare size={14} />
                                <span>{totalTasks} مهمة</span>
                            </div>
                        )}
                        {project.status === 'completed' && (
                            <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle size={14} />
                                <span>مكتمل</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
