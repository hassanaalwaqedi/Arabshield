'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
    /** Show labels next to icons */
    showLabel?: boolean;
    /** Compact mode for sidebar collapsed state */
    compact?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Theme Toggle Component
 * Cycles through light → dark → system themes
 * Uses mounted state to prevent hydration mismatch
 */
export function ThemeToggle({ showLabel = false, compact = false, className = '' }: ThemeToggleProps) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return placeholder with same dimensions to prevent layout shift
        return (
            <div className={`w-10 h-10 rounded-xl bg-muted animate-pulse ${className}`} />
        );
    }

    const cycleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    const getIcon = () => {
        if (theme === 'system') {
            return <Monitor className="w-5 h-5" />;
        }
        return resolvedTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />;
    };

    const getLabel = () => {
        if (theme === 'system') return 'تلقائي';
        return resolvedTheme === 'dark' ? 'داكن' : 'فاتح';
    };

    return (
        <motion.button
            onClick={cycleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                group relative flex items-center justify-center rounded-xl
                transition-all duration-300 
                bg-muted hover:bg-muted/80
                border border-border
                text-foreground
                ${compact ? 'p-2.5' : 'p-2.5'}
                ${showLabel && !compact ? 'gap-2 px-4' : ''}
                ${className}
            `}
            aria-label={`الوضع الحالي: ${getLabel()}. اضغط للتبديل`}
            title={`الوضع: ${getLabel()}`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    {getIcon()}
                </motion.div>
            </AnimatePresence>

            {showLabel && !compact && (
                <span className="text-sm font-medium">{getLabel()}</span>
            )}

            {/* Tooltip for compact mode */}
            {compact && (
                <div className="
                    absolute left-full mr-2 px-2.5 py-1.5
                    bg-card text-card-foreground text-xs font-medium
                    rounded-lg shadow-xl border border-border
                    opacity-0 group-hover:opacity-100
                    pointer-events-none whitespace-nowrap
                    transition-opacity duration-200
                    z-50
                ">
                    الوضع: {getLabel()}
                </div>
            )}
        </motion.button>
    );
}

/**
 * Simple Theme Toggle - Just toggles between light and dark
 */
export function SimpleThemeToggle({ className = '' }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`w-10 h-10 rounded-xl bg-muted animate-pulse ${className}`} />;
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                p-2.5 rounded-xl
                bg-muted hover:bg-muted/80
                border border-border
                text-foreground
                transition-all duration-300
                ${className}
            `}
            aria-label={resolvedTheme === 'dark' ? 'تبديل إلى الوضع الفاتح' : 'تبديل إلى الوضع الداكن'}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={resolvedTheme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {resolvedTheme === 'dark' ? (
                        <Moon className="w-5 h-5" />
                    ) : (
                        <Sun className="w-5 h-5" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
