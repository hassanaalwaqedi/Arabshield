/**
 * Task List Component
 * Displays a filterable list of tasks with search and status tabs
 */

'use client';

import { Task } from '@/lib/useDashboardData';
import TaskCard from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List, Inbox } from 'lucide-react';
import { useState, useMemo } from 'react';

interface TaskListProps {
    tasks: Task[];
    loading?: boolean;
    onEdit?: (task: Task) => void;
    onDelete?: (taskId: string) => void;
    onToggleComplete?: (taskId: string, currentStatus: string) => void;
}

type FilterStatus = 'all' | 'todo' | 'in-progress' | 'completed';

export default function TaskList({
    tasks,
    loading,
    onEdit,
    onDelete,
    onToggleComplete
}: TaskListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            // Filter by status
            if (filterStatus !== 'all' && task.status !== filterStatus) {
                return false;
            }
            // Filter by search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    task.title.toLowerCase().includes(query) ||
                    task.description?.toLowerCase().includes(query) ||
                    task.assignedTo?.toLowerCase().includes(query)
                );
            }
            return true;
        });
    }, [tasks, filterStatus, searchQuery]);

    const statusTabs: { key: FilterStatus; label: string; count: number }[] = [
        { key: 'all', label: 'الكل', count: tasks.length },
        { key: 'todo', label: 'قيد الانتظار', count: tasks.filter(t => t.status === 'todo').length },
        { key: 'in-progress', label: 'جاري التنفيذ', count: tasks.filter(t => t.status === 'in-progress').length },
        { key: 'completed', label: 'مكتمل', count: tasks.filter(t => t.status === 'completed').length },
    ];

    // Loading skeleton
    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
                    ))}
                </div>
                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="بحث في المهام..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-xl p-1 border border-slate-200">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {statusTabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilterStatus(tab.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filterStatus === tab.key
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white/70 text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        {tab.label}
                        <span className={`mr-2 px-1.5 py-0.5 rounded-full text-xs ${filterStatus === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tasks Grid/List */}
            {filteredTasks.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center min-h-[200px] bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-300 p-8"
                >
                    <Inbox size={48} className="text-slate-400 mb-4" />
                    <p className="text-lg text-slate-600 mb-2">لا توجد مهام</p>
                    <p className="text-sm text-slate-400">
                        {searchQuery ? 'جرب البحث بكلمات مختلفة' : 'ابدأ بإضافة مهمة جديدة'}
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className={`grid gap-4 ${viewMode === 'grid'
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1 max-w-2xl'
                        }`}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleComplete={onToggleComplete}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}
