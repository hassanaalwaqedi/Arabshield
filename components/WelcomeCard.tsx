"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Sparkles } from 'lucide-react';

const WELCOME_STORAGE_KEY = 'arabshield_welcome_shown';

export function WelcomeCard() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Check if user has seen the welcome card before
        const hasSeenWelcome = localStorage.getItem(WELCOME_STORAGE_KEY);
        if (!hasSeenWelcome) {
            // Small delay for better UX - let page load first
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
    };

    // Prevent hydration mismatch
    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        onClick={handleDismiss}
                    />

                    {/* Welcome Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.1
                        }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="relative max-w-md w-full pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Card */}
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-abyss-900/95 via-abyss-950/95 to-abyss-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-electric-500/10">

                                {/* Glow effects */}
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-electric-500/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-neon-500/15 rounded-full blur-3xl" />

                                {/* Animated border glow */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-electric-500/20 via-neon-500/20 to-electric-500/20 blur-xl -z-10"
                                />

                                {/* Content */}
                                <div className="relative p-8 text-center">
                                    {/* Dismiss button */}
                                    <button
                                        onClick={handleDismiss}
                                        className="absolute top-4 left-4 p-2 rounded-full text-abyss-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                                        aria-label="إغلاق"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                        className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-electric-500 to-neon-600 shadow-lg shadow-electric-500/30"
                                    >
                                        <Shield className="w-10 h-10 text-white" />
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-2xl md:text-3xl font-bold text-white mb-4"
                                    >
                                        مرحبًا بك في{' '}
                                        <span className="bg-gradient-to-r from-electric-400 to-neon-400 bg-clip-text text-transparent">
                                            ArabShield
                                        </span>
                                    </motion.h2>

                                    {/* Description */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-abyss-300 text-lg leading-relaxed mb-8"
                                    >
                                        حلول تقنية متقدمة مصممة لحماية أعمالك وتسريع نموك.
                                    </motion.p>

                                    {/* CTA Button */}
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        onClick={handleDismiss}
                                        className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-electric-500 to-neon-600 text-white font-semibold shadow-lg shadow-electric-500/30 hover:shadow-electric-500/50 hover:scale-105 transition-all duration-300"
                                    >
                                        <span>ابدأ الآن</span>
                                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    </motion.button>
                                </div>

                                {/* Bottom accent line */}
                                <div className="h-1 bg-gradient-to-r from-transparent via-electric-500 to-transparent" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
