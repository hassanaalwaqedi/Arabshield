"use client";

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    hover?: boolean;
    glow?: 'electric' | 'cyan' | 'purple' | 'none';
    children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = true, glow = 'none', children, ...props }, ref) => {
        const glowClasses = {
            electric: 'hover:glow-electric',
            cyan: 'hover:glow-cyan',
            purple: 'hover:glow-purple',
            none: '',
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
                className={cn(
                    'rounded-2xl border bg-white p-6 shadow-lg transition-all duration-300',
                    hover && 'hover:shadow-2xl',
                    glowClasses[glow],
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5 pb-4', className)}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('text-2xl font-bold leading-none tracking-tight text-abyss-950', className)}
            {...props}
        />
    )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-abyss-600', className)}
            {...props}
        />
    )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('', className)} {...props} />
    )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center pt-4', className)}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
