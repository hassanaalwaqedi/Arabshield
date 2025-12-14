"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-electric-600 to-electric-500 text-white hover:from-electric-700 hover:to-electric-600 shadow-lg shadow-electric-500/30 hover:shadow-xl hover:shadow-electric-500/40',
            secondary: 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white hover:from-cyan-700 hover:to-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40',
            outline: 'border-2 border-electric-500 text-electric-600 hover:bg-electric-50 hover:border-electric-600',
            ghost: 'text-abyss-700 hover:bg-abyss-100 hover:text-electric-600',
            glow: 'bg-gradient-to-r from-electric-600 via-cyan-500 to-purple-600 text-white shadow-2xl hover:shadow-electric-500/50 glow-electric',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
