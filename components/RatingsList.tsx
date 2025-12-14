/**
 * Ratings List Component
 * Display list of ratings with summary
 */

'use client';

import { Rating } from '@/lib/useDashboardData';
import RatingCard from './RatingCard';
import RatingStars from './RatingStars';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { useState, useMemo } from 'react';

interface RatingsListProps {
    ratings: Rating[];
    loading?: boolean;
    currentUserId: string;
    averageRating: number;
    onEdit?: (rating: Rating) => void;
    onDelete?: (ratingId: string) => void;
}

type SortOption = 'recent' | 'highest' | 'lowest';

export default function RatingsList({
    ratings,
    loading,
    currentUserId,
    averageRating,
    onEdit,
    onDelete
}: RatingsListProps) {
    const [sortOption, setSortOption] = useState<SortOption>('recent');

    const sortedRatings = useMemo(() => {
        const sorted = [...ratings];
        switch (sortOption) {
            case 'recent':
                return sorted.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            case 'highest':
                return sorted.sort((a, b) => b.score - a.score);
            case 'lowest':
                return sorted.sort((a, b) => a.score - b.score);
            default:
                return sorted;
        }
    }, [ratings, sortOption]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold mb-2">
                            {averageRating > 0 ? averageRating.toFixed(1) : '—'}
                        </div>
                        <RatingStars
                            rating={averageRating}
                            size={24}
                        />
                        <p className="text-white/80 text-sm mt-2">
                            متوسط التقييم
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-r border-white/20 pt-6 md:pt-0">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare size={32} />
                            <span className="text-4xl font-bold">{ratings.length}</span>
                        </div>
                        <p className="text-white/80 text-sm">
                            {ratings.length === 1 ? 'تقييم واحد' : 'تقييمات'}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sort and Filter */}
            {ratings.length > 0 && (
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">التقييمات</h3>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="recent">الأحدث</option>
                        <option value="highest">الأعلى تقييماً</option>
                        <option value="lowest">الأقل تقييماً</option>
                    </select>
                </div>
            )}

            {/* Ratings List */}
            {sortedRatings.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-300"
                >
                    <Star size={48} className="text-slate-300 mb-4" />
                    <p className="text-slate-600 text-lg mb-2">لا توجد تقييمات بعد</p>
                    <p className="text-sm text-slate-400">كن أول من يقيم هذا المشروع</p>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {sortedRatings.map((rating) => (
                        <RatingCard
                            key={rating.id}
                            rating={rating}
                            currentUserId={currentUserId}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
