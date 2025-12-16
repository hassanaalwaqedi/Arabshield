'use client';

/**
 * Toast Notification System
 * Provides success, error, warning, and info notifications
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    showToast: (type: ToastType, message: string, duration?: number) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastConfig = {
    success: {
        icon: CheckCircle2,
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
        text: 'text-green-400',
        iconColor: 'text-green-400'
    },
    error: {
        icon: XCircle,
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        text: 'text-red-400',
        iconColor: 'text-red-400'
    },
    warning: {
        icon: AlertTriangle,
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        iconColor: 'text-yellow-400'
    },
    info: {
        icon: Info,
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        iconColor: 'text-blue-400'
    }
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        setToasts(prev => [...prev, { id, type, message, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const success = useCallback((message: string) => showToast('success', message), [showToast]);
    const error = useCallback((message: string) => showToast('error', message), [showToast]);
    const warning = useCallback((message: string) => showToast('warning', message), [showToast]);
    const info = useCallback((message: string) => showToast('info', message), [showToast]);

    return (
        <ToastContext.Provider value={{ toasts, showToast, success, error, warning, info, removeToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2 max-w-sm" dir="rtl">
                <AnimatePresence mode="popLayout">
                    {toasts.map(toast => {
                        const config = toastConfig[toast.type];
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, x: -100, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                className={`
                                    ${config.bg} ${config.border} border
                                    backdrop-blur-xl rounded-xl p-4
                                    flex items-start gap-3 shadow-2xl
                                `}
                            >
                                <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
                                <p className={`${config.text} text-sm flex-1`}>{toast.message}</p>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextValue {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
