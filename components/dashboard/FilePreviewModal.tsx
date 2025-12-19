/**
 * File Preview Modal
 * Preview images and PDFs in a modal
 */

'use client';

import { Document } from '@/lib/useDashboardData';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface FilePreviewModalProps {
    document: Document | null;
    onClose: () => void;
}

export default function FilePreviewModal({ document, onClose }: FilePreviewModalProps) {
    const [fullscreen, setFullscreen] = useState(false);

    if (!document) return null;

    const isImage = document.fileType.includes('image');
    const isPDF = document.fileType.includes('pdf');
    const canPreview = isImage || isPDF;

    const handleDownload = () => {
        window.open(document.fileUrl, '_blank');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden ${fullscreen ? 'w-full h-full' : 'max-w-5xl max-h-[90vh] w-full'
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 truncate">{document.filename}</h3>
                            <p className="text-sm text-muted-foreground">{document.fileType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDownload}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="تحميل"
                            >
                                <Download size={20} />
                            </button>
                            {canPreview && (
                                <button
                                    onClick={() => setFullscreen(!fullscreen)}
                                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                    title="ملء الشاشة"
                                >
                                    <Maximize2 size={20} />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                title="إغلاق"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Preview Content */}
                    <div className={`overflow-auto ${fullscreen ? 'h-[calc(100%-73px)]' : 'max-h-[calc(90vh-73px)]'}`}>
                        {isImage && (
                            <div className="flex items-center justify-center p-8 bg-slate-50">
                                <img
                                    src={document.fileUrl}
                                    alt={document.filename}
                                    className="max-w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        )}

                        {isPDF && (
                            <iframe
                                src={document.fileUrl}
                                className="w-full h-full min-h-[600px]"
                                title={document.filename}
                            />
                        )}

                        {!canPreview && (
                            <div className="flex flex-col items-center justify-center p-12 text-center">
                                <div className="text-6xl mb-4">📎</div>
                                <p className="text-lg text-slate-900 mb-2">لا يمكن معاينة هذا الملف</p>
                                <p className="text-sm text-muted-foreground mb-6">
                                    نوع الملف {document.fileType} غير مدعوم للمعاينة
                                </p>
                                <button
                                    onClick={handleDownload}
                                    className="px-6 py-3 bg-blue-600 text-foreground rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Download size={18} />
                                    <span>تحميل الملف</span>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
