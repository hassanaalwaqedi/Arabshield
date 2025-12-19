/**
 * Tasks Dashboard Page
 * Full task management with CRUD operations
 */

'use client';

import { useTasks, Task } from '@/lib/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { createTask, updateTask, deleteTask, toggleTaskComplete } from '@/lib/taskService';
import TaskList from '@/components/dashboard/TaskList';
import TaskForm, { TaskFormData } from '@/components/dashboard/TaskForm';
import { Plus, Loader2, AlertCircle, CheckSquare, Clock, ListTodo, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function TasksPage() {
    const { user } = useAuth();
    const { tasks, loading, error } = useTasks(user?.uid);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleCreateTask = async (formData: TaskFormData) => {
        await createTask(formData);
    };

    const handleUpdateTask = async (formData: TaskFormData) => {
        if (editingTask) {
            await updateTask(editingTask.id, formData);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        await deleteTask(taskId);
        setDeleteConfirm(null);
    };

    const handleToggleComplete = async (taskId: string, currentStatus: string) => {
        await toggleTaskComplete(taskId, currentStatus);
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    // Stats
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    // Loading state
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">المهام</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-slate-200 h-24 rounded-xl"></div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-slate-200 h-32 rounded-xl"></div>
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
                    className="px-6 py-3 bg-blue-600 text-foreground rounded-lg hover:bg-blue-700 transition-colors"
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">المهام</h1>
                    <p className="text-slate-600">إدارة وتتبع جميع المهام الخاصة بمشاريعك</p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-xl hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    <span>مهمة جديدة</span>
                </button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-slate-200 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <CheckSquare className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">إجمالي المهام</p>
                            <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-slate-200 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-100 rounded-xl">
                            <ListTodo className="text-slate-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">قيد الانتظار</p>
                            <p className="text-2xl font-bold text-slate-900">{todoCount}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-slate-200 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Clock className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">جاري التنفيذ</p>
                            <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-slate-200 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">مكتمل</p>
                            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Task List */}
            <TaskList
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={(taskId) => setDeleteConfirm(taskId)}
                onToggleComplete={handleToggleComplete}
            />

            {/* Task Form Modal */}
            <TaskForm
                isOpen={showForm}
                onClose={handleCloseForm}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                editTask={editingTask}
            />

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDeleteConfirm(null)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                    >
                        <h3 className="text-lg font-bold text-slate-900 mb-2">حذف المهمة</h3>
                        <p className="text-slate-600 mb-6">هل أنت متأكد من حذف هذه المهمة؟ لا يمكن التراجع عن هذا الإجراء.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={() => handleDeleteTask(deleteConfirm)}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-foreground rounded-xl font-medium hover:bg-red-700 transition-colors"
                            >
                                حذف
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
