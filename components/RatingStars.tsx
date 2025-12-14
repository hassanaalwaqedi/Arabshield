/**
 * Rating Stars Component
 * Display or select star rating
 */

'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
    size?: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
}

export default function RatingStars({
    rating,
    maxRating = 5,
    size = 20,
    interactive = false,
    onRatingChange
}: RatingStarsProps) {
    const handleClick = (index: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(index + 1);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, index) => {
                const filled = index < Math.floor(rating);
                const halfFilled = index < rating && index >= Math.floor(rating);

                return (
                    <motion.button
                        key={index}
                        onClick={() => handleClick(index)}
                        disabled={!interactive}
                        whileHover={interactive ? { scale: 1.2 } : {}}
                        whileTap={interactive ? { scale: 0.9 } : {}}
                        className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
                    >
                        <Star
                            size={size}
                            className={`${filled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : halfFilled
                                        ? 'fill-yellow-200 text-yellow-400'
                                        : 'text-slate-300'
                                }`}
                        />
                    </motion.button>
                );
            })}
        </div>
    );
}
