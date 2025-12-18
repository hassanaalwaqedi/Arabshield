/**
 * Project Detail Page
 * Shows project information with embedded chat
 */

'use client';

import { useParams } from 'next/navigation';
import { useProjects, useProjectTasks, useProjectDocuments, useCompanyRatings, useAverageRating, Rating } from '@/lib/useDashboardData';
import ChatPanel from '@/components/dashboard/ChatPanel';
import TaskCard from '@/components/dashboard/TaskCard';
import TaskProgressBar from '@/components/dashboard/TaskProgressBar';
import DocumentUpload from '@/components/dashboard/DocumentUpload';
import DocumentList from '@/components/dashboard/DocumentList';
import FilePreviewModal from '@/components/dashboard/FilePreviewModal';
import RatingForm from '@/components/RatingForm';
import RatingsList from '@/components/RatingsList';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle, CheckSquare, Clock, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { toggleTaskComplete } from '@/lib/taskService';
import { deleteDocument } from '@/lib/documentService';
import { submitRating, updateRating, deleteRating } from '@/lib/ratingService';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params?.id as string;

    // Get current user from auth context
    const { user } = useAuth();
    const currentUserId = user?.uid || '';
    const currentUserName = user?.displayName || 'المستخدم الحالي';

    const { projects, loading: projectsLoading } = useProjects(currentUserId);
    const { tasks } = useProjectTasks(projectId);
    const { documents } = useProjectDocuments(projectId);
    const { ratings } = useCompanyRatings(projectId);
    const { average } = useAverageRating(projectId);

    const project = projects.find(p => p.id === projectId);

    // Preview state
    const [previewDocument, setPreviewDocument] = useState<typeof documents[0] | null>(null);
    const [editingRating, setEditingRating] = useState<Rating | null>(null);

    // Rating handlers
    const handleSubmitRating = async (score: number, comment: string) => {
        await submitRating({
            companyId: projectId,
            userId: currentUserId,
            userName: currentUserName,
            score,
            comment
        });
    };

    const handleUpdateRating = async (score: number, comment: string) => {
        if (editingRating) {
            await updateRating(editingRating.id, score, comment);
            setEditingRating(null);
        }
    };

    const handleDeleteRating = async (ratingId: string) => {
        if (confirm('هل تريد حذف هذا التقييم؟')) {
            await deleteRating(ratingId);
        }
    };

    if (projectsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg text-red-600 mb-4">المشروع غير موجود</p>
                <Link
                    href="/dashboard/projects"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    العودة للمشاريع
                </Link>
            </div>
        );
    }

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
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Link
                    href="/dashboard/projects"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>العودة للمشاريع</span>
                </Link>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{project.title}</h1>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                                {getStatusLabel(project.status)}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-slate-500">
                                <Calendar size={14} />
                                {new Date(project.createdAt).toLocaleDateString('ar-SA')}
                            </span>
                        </div>
                    </div>
                </div>

                {project.description && (
                    <p className="text-slate-600 mt-4">{project.description}</p>
                )}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Panel - 2 columns on large screens */}
                <div className="lg:col-span-2 h-[600px]">
                    <ChatPanel
                        projectId={projectId}
                        currentUserId={currentUserId}
                        currentUserName={currentUserName}
                    />
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-6">
                    {/* Project Progress */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
                    >
                        <h3 className="font-bold text-slate-900 mb-4">تقدم المشروع</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-slate-600">الإنجاز الكلي</span>
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

                            {tasks.length > 0 && (
                                <TaskProgressBar tasks={tasks} showLabel={true} />
                            )}
                        </div>
                    </motion.div>

                    {/* Project Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
                    >
                        <h3 className="font-bold text-slate-900 mb-4">إحصائيات</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <CheckSquare size={16} className="text-blue-600" />
                                    المهام
                                </span>
                                <span className="font-bold text-slate-900">{tasks.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Clock size={16} className="text-green-600" />
                                    المهام المكتملة
                                </span>
                                <span className="font-bold text-green-600">
                                    {tasks.filter(t => t.status === 'completed').length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <FileText size={16} className="text-purple-600" />
                                    المستندات
                                </span>
                                <span className="font-bold text-purple-600">
                                    {documents.length}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Project Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
                        >
                            <h3 className="font-bold text-slate-900 mb-4">الوسوم</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Tasks Section */}
            {tasks.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-xl font-bold text-slate-900 mb-4">مهام المشروع</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggleComplete={(taskId, status) => toggleTaskComplete(taskId, status)}
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Documents Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
            >
                <h2 className="text-xl font-bold text-slate-900">مستندات المشروع</h2>
                <DocumentUpload
                    projectId={projectId}
                    currentUserId={currentUserId}
                />
                <DocumentList
                    documents={documents}
                    currentUserId={currentUserId}
                    onPreview={setPreviewDocument}
                    onDelete={async (docId, fileUrl) => {
                        if (confirm('هل تريد حذف هذا المستند؟')) {
                            await deleteDocument(docId, fileUrl);
                        }
                    }}
                />
            </motion.div>

            {/* File Preview Modal */}
            <FilePreviewModal
                document={previewDocument}
                onClose={() => setPreviewDocument(null)}
            />

            {/* Ratings Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <h2 className="text-xl font-bold text-slate-900">التقييمات والمراجعات</h2>

                {editingRating ? (
                    <RatingForm
                        onSubmit={handleUpdateRating}
                        onCancel={() => setEditingRating(null)}
                        initialScore={editingRating.score}
                        initialComment={editingRating.comment}
                        submitLabel="تحديث التقييم"
                    />
                ) : (
                    <RatingForm onSubmit={handleSubmitRating} />
                )}

                <RatingsList
                    ratings={ratings}
                    averageRating={average}
                    currentUserId={currentUserId}
                    onEdit={setEditingRating}
                    onDelete={handleDeleteRating}
                />
            </motion.div>
        </div>
    );
}
