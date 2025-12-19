/**
 * Rating Card Component
 * Display individual rating/review
 */

'use client';

import { Rating } from '@/lib/useDashboardData';
import RatingStars from './RatingStars';
import { motion } from 'framer-motion';
import { User, Trash2, Edit, Calendar } from 'lucide-react';
import { useState } from 'react';

interface RatingCardProps {
    rating: Rating;
    currentUserId: string;
    onEdit?: (rating: Rating) => void;
    onDelete?: (ratingId: string) => void;
}

export default function RatingCard({ rating, currentUserId, onEdit, onDelete }: RatingCardProps) {
    const [showActions, setShowActions] = useState(false);
    const isOwnRating = rating.userId === currentUserId;

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-slate-200"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <User size={20} className="text-foreground" />
                    </div>
                    <div>
                        <h4 className="font-medium text-slate-900">{rating.userName}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar size={12} />
                            <span>{formatDate(rating.createdAt)}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {isOwnRating && showActions && (
                    <div className="flex items-center gap-1">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(rating)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="تعديل"
                            >
                                <Edit size={16} />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(rating.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="حذف"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Rating */}
            <div className="mb-3">
                <RatingStars rating={rating.score} size={18} />
            </div>

            {/* Comment */}
            <p className="text-slate-700 text-sm leading-relaxed">{rating.comment}</p>

            {rating.updatedAt && (
                <p className="text-xs text-muted-foreground mt-2">
                    (تم التعديل في {formatDate(rating.updatedAt)})
                </p>
            )}
        </motion.div>
    );
}
