import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-abyss-900 text-white hover:bg-abyss-800',
                electric: 'border-transparent bg-electric-500 text-white hover:bg-electric-600 shadow-lg shadow-electric-500/30',
                cyan: 'border-transparent bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/30',
                purple: 'border-transparent bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/30',
                outline: 'border-abyss-300 text-abyss-700 hover:bg-abyss-50',
                ghost: 'border-transparent hover:bg-abyss-100 text-abyss-700',
                success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
                warning: 'border-transparent bg-orange-500 text-white hover:bg-orange-600',
                danger: 'border-transparent bg-red-500 text-white hover:bg-red-600',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
        );
    }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
