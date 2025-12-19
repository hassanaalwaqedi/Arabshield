/**
 * Document List Component
 * Displays grid of documents with search, filter, and sort
 */

'use client';

import { Document } from '@/lib/useDashboardData';
import DocumentCard from './DocumentCard';
import { motion } from 'framer-motion';
import { FileText, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';

interface DocumentListProps {
    documents: Document[];
    loading?: boolean;
    currentUserId: string;
    onDelete?: (docId: string, fileUrl: string) => void;
    onPreview?: (document: Document) => void;
}

type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest' | 'size-largest' | 'size-smallest';
type FilterOption = 'all' | 'images' | 'documents' | 'archives' | 'other';

export default function DocumentList({
    documents,
    loading,
    currentUserId,
    onDelete,
    onPreview
}: DocumentListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('date-newest');
    const [filterOption, setFilterOption] = useState<FilterOption>('all');

    // Filter and sort documents
    const filteredAndSortedDocuments = useMemo(() => {
        let filtered = [...documents];

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(doc =>
                doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Type filter
        if (filterOption !== 'all') {
            filtered = filtered.filter(doc => {
                const type = doc.fileType.toLowerCase();
                switch (filterOption) {
                    case 'images':
                        return type.includes('image');
                    case 'documents':
                        return type.includes('pdf') || type.includes('document') ||
                            type.includes('word') || type.includes('text');
                    case 'archives':
                        return type.includes('zip') || type.includes('rar') || type.includes('archive');
                    case 'other':
                        return !type.includes('image') && !type.includes('pdf') &&
                            !type.includes('document') && !type.includes('word') &&
                            !type.includes('zip') && !type.includes('rar');
                    default:
                        return true;
                }
            });
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortOption) {
                case 'name-asc':
                    return a.filename.localeCompare(b.filename);
                case 'name-desc':
                    return b.filename.localeCompare(a.filename);
                case 'date-newest':
                    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
                case 'date-oldest':
                    return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
                case 'size-largest':
                    return b.fileSize - a.fileSize;
                case 'size-smallest':
                    return a.fileSize - b.fileSize;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [documents, searchQuery, sortOption, filterOption]);

    // Loading state
    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-12 bg-slate-200 rounded-xl animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="ابحث عن ملف..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                {/* Type Filter */}
                <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value as FilterOption)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                    <option value="all">جميع الملفات</option>
                    <option value="images">الصور</option>
                    <option value="documents">المستندات</option>
                    <option value="archives">الملفات المضغوطة</option>
                    <option value="other">أخرى</option>
                </select>

                {/* Sort */}
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                    <option value="date-newest">الأحدث أولاً</option>
                    <option value="date-oldest">الأقدم أولاً</option>
                    <option value="name-asc">الاسم (أ-ي)</option>
                    <option value="name-desc">الاسم (ي-أ)</option>
                    <option value="size-largest">الأكبر حجماً</option>
                    <option value="size-smallest">الأصغر حجماً</option>
                </select>
            </div>

            {/* Results count */}
            {(searchQuery || filterOption !== 'all') && (
                <p className="text-sm text-muted-foreground">
                    {filteredAndSortedDocuments.length} {filteredAndSortedDocuments.length === 1 ? 'ملف' : 'ملفات'}
                </p>
            )}

            {/* Empty state */}
            {filteredAndSortedDocuments.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-300"
                >
                    <FileText size={48} className="text-slate-300 mb-4" />
                    <p className="text-slate-600 text-lg mb-2">
                        {searchQuery || filterOption !== 'all' ? 'لم يتم العثور على ملفات' : 'لا توجد مستندات'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {searchQuery || filterOption !== 'all' ? 'جرب تغيير البحث أو الفلتر' : 'ارفع ملفاتك لبدء مشاركة المستندات'}
                    </p>
                </motion.div>
            )}

            {/* Documents Grid */}
            {filteredAndSortedDocuments.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAndSortedDocuments.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            document={doc}
                            currentUserId={currentUserId}
                            onDelete={onDelete}
                            onPreview={onPreview}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
