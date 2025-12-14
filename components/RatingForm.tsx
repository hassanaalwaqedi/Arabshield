/**
 * Rating Form Component
 * Submit or edit a rating
 */

'use client';

import RatingStars from './RatingStars';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useState } from 'react';

interface RatingFormProps {
    onSubmit: (score: number, comment: string) => Promise<void>;
    onCancel?: () => void;
    initialScore?: number;
    initialComment?: string;
    submitLabel?: string;
}

export default function RatingForm({
    onSubmit,
    onCancel,
    initialScore = 0,
    initialComment = '',
    submitLabel = 'إرسال التقييم'
}: RatingFormProps) {
    const [score, setScore] = useState(initialScore);
    const [comment, setComment] = useState(initialComment);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (score === 0) {
            setError('يرجى اختيار تقييم');
            return;
        }

        if (!comment.trim()) {
            setError('يرجى كتابة تعليق');
            return;
        }

        setError(null);
        setSubmitting(true);

        try {
            await onSubmit(score, comment);
            // Reset form
            setScore(0);
            setComment('');
        } catch (err: any) {
            setError(err.message || 'فشل في إرسال التقييم');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200"
        >
            <h3 className="text-lg font-bold text-slate-900 mb-4">تقييم المشروع</h3>

            {/* Star Rating */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    التقييم
                </label>
                <RatingStars
                    rating={score}
                    interactive={true}
                    size={32}
                    onRatingChange={setScore}
                />
                {score > 0 && (
                    <p className="text-sm text-slate-500 mt-2">
                        {score} من 5 نجوم
                    </p>
                )}
            </div>

            {/* Comment */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    التعليق
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="اكتب تعليقك هنا..."
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-400">
                        {comment.length}/500
                    </span>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                    <Send size={18} />
                    <span>{submitting ? 'جاري الإرسال...' : submitLabel}</span>
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                        إلغاء
                    </button>
                )}
            </div>
        </motion.form>
    );
}
