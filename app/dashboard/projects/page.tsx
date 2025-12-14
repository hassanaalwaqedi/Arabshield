/**
 * Projects Dashboard Page
 * Displays all projects with create/edit capabilities
 */

'use client';

import { useProjects } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Plus, Loader2, AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ProjectsPage() {
    const { user } = useAuth();
    const { projects, loading, error } = useProjects(user?.uid);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'active' | 'on-hold'>('active');
    const [creating, setCreating] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setFormError('يجب تسجيل الدخول لإنشاء مشروع');
            return;
        }

        if (!title.trim()) {
            setFormError('الرجاء إدخال اسم المشروع');
            return;
        }

        setCreating(true);
        setFormError(null);

        try {
            await addDoc(collection(db, 'projects'), {
                title: title.trim(),
                description: description.trim(),
                status,
                progress: 0,
                ownerId: user.uid,
                tags: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            // Reset form and close modal
            setTitle('');
            setDescription('');
            setStatus('active');
            setShowCreateModal(false);
        } catch (err) {
            console.error('Error creating project:', err);
            setFormError('حدث خطأ أثناء إنشاء المشروع');
        } finally {
            setCreating(false);
        }
    };

    const closeModal = () => {
        setShowCreateModal(false);
        setTitle('');
        setDescription('');
        setStatus('active');
        setFormError(null);
    };

    // Skeleton loader
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">المشاريع</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-slate-200 h-64 rounded-2xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">المشاريع</h1>
                    <p className="text-slate-600">إدارة جميع مشاريعك من مكان واحد</p>
                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    <span>مشروع جديد</span>
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">إجمالي المشاريع</p>
                    <p className="text-2xl font-bold text-slate-900">{projects.length}</p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">المشاريع النشطة</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {projects.filter(p => p.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">المشاريع المكتملة</p>
                    <p className="text-2xl font-bold text-green-600">
                        {projects.filter(p => p.status === 'completed').length}
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            {projects.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center min-h-[300px] bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-300"
                >
                    <p className="text-lg text-slate-600 mb-4">لا توجد مشاريع بعد</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        إنشاء مشروع جديد
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-lg w-full relative"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-slate-500" />
                        </button>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">مشروع جديد</h2>

                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
                                <AlertCircle size={18} />
                                <span>{formError}</span>
                            </div>
                        )}

                        <form onSubmit={handleCreateProject} className="space-y-5">
                            {/* Project Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    اسم المشروع <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="مثال: تطبيق الهاتف المحمول"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    الوصف
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="وصف مختصر للمشروع..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    الحالة
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStatus('active')}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all ${status === 'active'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        نشط
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatus('on-hold')}
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all ${status === 'on-hold'
                                                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                    >
                                        معلق
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
                                    disabled={creating}
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {creating ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>جاري الإنشاء...</span>
                                        </>
                                    ) : (
                                        <span>إنشاء المشروع</span>
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
