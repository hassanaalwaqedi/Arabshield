/**
 * Task Form Component
 * Modal form for creating and editing tasks
 */

'use client';

import { Task } from '@/lib/useDashboardData';
import { useProjects } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Calendar, User, FileText, CheckSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskData: TaskFormData) => Promise<void>;
    editTask?: Task | null;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'completed';
    deadline: string;
    assignedTo: string;
    projectId: string;
}

export default function TaskForm({ isOpen, onClose, onSubmit, editTask }: TaskFormProps) {
    const { user } = useAuth();
    const { projects } = useProjects(user?.uid);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        status: 'todo',
        deadline: '',
        assignedTo: '',
        projectId: ''
    });
    const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

    // Reset form when opening/closing or when editTask changes
    useEffect(() => {
        if (isOpen && editTask) {
            setFormData({
                title: editTask.title,
                description: editTask.description || '',
                status: editTask.status,
                deadline: editTask.deadline ? editTask.deadline.split('T')[0] : '',
                assignedTo: editTask.assignedTo || '',
                projectId: editTask.projectId
            });
        } else if (isOpen) {
            setFormData({
                title: '',
                description: '',
                status: 'todo',
                deadline: '',
                assignedTo: '',
                projectId: ''
            });
        }
        setErrors({});
    }, [isOpen, editTask]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'عنوان المهمة مطلوب';
        }
        if (!formData.projectId) {
            newErrors.projectId = 'يجب اختيار مشروع';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                deadline: formData.deadline ? new Date(formData.deadline).toISOString() : ''
            });
            onClose();
        } catch (error) {
            console.error('Error submitting task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof TaskFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editTask ? 'تعديل المهمة' : 'مهمة جديدة'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-muted-foreground" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                    <CheckSquare size={16} />
                                    <span>عنوان المهمة *</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="أدخل عنوان المهمة"
                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-muted-foreground focus:outline-none focus:bg-white focus:ring-2 transition-all ${errors.title
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                                        }`}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                    <FileText size={16} />
                                    <span>الوصف</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="أدخل وصف المهمة (اختياري)"
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-muted-foreground focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                />
                            </div>

                            {/* Project */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                    <FileText size={16} />
                                    <span>المشروع *</span>
                                </label>
                                <select
                                    value={formData.projectId}
                                    onChange={(e) => handleChange('projectId', e.target.value)}
                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 transition-all ${errors.projectId
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                                        }`}
                                >
                                    <option value="">اختر مشروع</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>
                                            {project.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.projectId && (
                                    <p className="mt-1 text-sm text-red-600">{errors.projectId}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                    الحالة
                                </label>
                                <div className="flex gap-2">
                                    {[
                                        { value: 'todo', label: 'قيد الانتظار', color: 'bg-slate-100 text-slate-700 border-slate-200' },
                                        { value: 'in-progress', label: 'جاري التنفيذ', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                                        { value: 'completed', label: 'مكتمل', color: 'bg-green-100 text-green-700 border-green-200' },
                                    ].map(status => (
                                        <button
                                            key={status.value}
                                            type="button"
                                            onClick={() => handleChange('status', status.value)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${formData.status === status.value
                                                ? `${status.color} ring-2 ring-offset-2 ring-blue-500`
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {status.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                    <Calendar size={16} />
                                    <span>تاريخ الاستحقاق</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => handleChange('deadline', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            {/* Assigned To */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                    <User size={16} />
                                    <span>المسؤول</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.assignedTo}
                                    onChange={(e) => handleChange('assignedTo', e.target.value)}
                                    placeholder="اسم الشخص المسؤول (اختياري)"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-muted-foreground focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>جاري الحفظ...</span>
                                        </>
                                    ) : (
                                        <span>{editTask ? 'حفظ التعديلات' : 'إنشاء المهمة'}</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
