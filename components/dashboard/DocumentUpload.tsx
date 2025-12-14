/**
 * Document Upload Component
 * Drag & drop file upload with progress
 */

'use client';

import { uploadDocument } from '@/lib/documentService';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useRef, DragEvent } from 'react';

interface DocumentUploadProps {
    projectId: string;
    currentUserId: string;
    onUploadComplete?: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function DocumentUpload({ projectId, currentUserId, onUploadComplete }: DocumentUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        if (file.size > MAX_FILE_SIZE) {
            return `الملف ${file.name} كبير جداً (الحد الأقصى 10 ميجابايت)`;
        }
        return null;
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setError(null);
        setUploading(true);
        const uploaded: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                continue;
            }

            try {
                await uploadDocument({
                    projectId,
                    file,
                    uploadedBy: currentUserId
                });
                uploaded.push(file.name);
            } catch (err) {
                setError(`فشل في رفع ${file.name}`);
                console.error(err);
            }
        }

        setUploadedFiles(uploaded);
        setUploading(false);

        if (uploaded.length > 0 && onUploadComplete) {
            onUploadComplete();
        }

        // Reset after 3 seconds
        setTimeout(() => {
            setUploadedFiles([]);
            setError(null);
        }, 3000);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 bg-white/70 backdrop-blur-xl hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="*/*"
                />

                <div className="flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        <Upload size={32} className={isDragging ? 'text-blue-600' : 'text-slate-600'} />
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-medium text-slate-900 mb-1">
                            اسحب وأفلت الملفات هنا
                        </p>
                        <p className="text-sm text-slate-500">
                            أو انقر للاختيار (الحد الأقصى 10 ميجابايت)
                        </p>
                    </div>
                </div>

                {/* Upload Progress */}
                {uploading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-2" />
                            <p className="text-slate-600">جاري الرفع...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Success/Error Messages */}
            <AnimatePresence>
                {uploadedFiles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700"
                    >
                        <CheckCircle size={20} />
                        <span className="text-sm">
                            تم رفع {uploadedFiles.length} ملف بنجاح
                        </span>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-xl text-red-700"
                    >
                        <div className="flex items-center gap-2">
                            <AlertCircle size={20} />
                            <span className="text-sm">{error}</span>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            className="p-1 hover:bg-red-100 rounded"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
