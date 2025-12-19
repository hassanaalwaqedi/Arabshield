/**
 * Document Card Component
 * Displays individual document with preview, download, and delete options
 */

'use client';

import { Document } from '@/lib/useDashboardData';
import { formatFileSize, getFileIcon } from '@/lib/documentService';
import { motion } from 'framer-motion';
import { Download, Trash2, User, Calendar, Eye } from 'lucide-react';
import { useState } from 'react';

interface DocumentCardProps {
    document: Document;
    currentUserId: string;
    onDelete?: (docId: string, fileUrl: string) => void;
    onPreview?: (document: Document) => void;
}

export default function DocumentCard({ document, currentUserId, onDelete, onPreview }: DocumentCardProps) {
    const [showDelete, setShowDelete] = useState(false);

    const canPreview = document.fileType.includes('image') || document.fileType.includes('pdf');

    const handleDownload = () => {
        window.open(document.fileUrl, '_blank');
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all"
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            <div className="flex items-start gap-3">
                {/* File Icon */}
                <div className="text-4xl">{getFileIcon(document.fileType)}</div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate mb-1">
                        {document.filename}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatFileSize(document.fileSize)}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{formatDate(document.uploadedAt)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <User size={12} />
                        <span>{document.uploadedBy}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    {canPreview && onPreview && (
                        <button
                            onClick={() => onPreview(document)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="معاينة"
                        >
                            <Eye size={18} />
                        </button>
                    )}
                    <button
                        onClick={handleDownload}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="تحميل"
                    >
                        <Download size={18} />
                    </button>

                    {document.uploadedBy === currentUserId && onDelete && showDelete && (
                        <button
                            onClick={() => onDelete(document.id, document.fileUrl)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
