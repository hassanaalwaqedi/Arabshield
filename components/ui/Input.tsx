"use client";

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    'flex h-12 w-full rounded-xl border-2 border-abyss-200 bg-white px-4 py-2 text-base text-abyss-950 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-abyss-400 focus-visible:outline-none focus-visible:border-electric-500 focus-visible:ring-4 focus-visible:ring-electric-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-abyss-300',
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
