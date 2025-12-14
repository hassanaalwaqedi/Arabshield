'use client';

/**
 * MaintenanceGuard Component
 * Blocks dashboard access when maintenance mode is enabled
 * Admins can still access
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';
import { Wrench, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface MaintenanceGuardProps {
    children: React.ReactNode;
}

export function MaintenanceGuard({ children }: MaintenanceGuardProps) {
    const { settings, loading } = useSettings();
    const { role, loading: authLoading } = useAuth();

    // If still loading, show nothing or skeleton
    if (loading || authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-abyss-50 via-electric-50/20 to-cyan-50/30">
                <div className="animate-spin h-10 w-10 border-4 border-electric-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // If maintenance mode is on AND user is not admin, show maintenance screen
    if (settings.maintenanceMode && !isAdminRole(role)) {
        return <MaintenanceScreen />;
    }

    // Admin bypass or maintenance mode off - render children
    return (
        <>
            {/* Admin notice when maintenance mode is on */}
            {settings.maintenanceMode && isAdminRole(role) && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-medium">
                    <Shield className="inline-block h-4 w-4 mr-2" />
                    وضع الصيانة مفعّل - أنت تشاهد كمسؤول
                </div>
            )}
            <div className={settings.maintenanceMode && isAdminRole(role) ? 'pt-8' : ''}>
                {children}
            </div>
        </>
    );
}

/**
 * Maintenance Screen shown to non-admin users
 */
function MaintenanceScreen() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-abyss-50 via-electric-50/20 to-cyan-50/30 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-abyss-200/50 p-12 max-w-md w-full text-center"
            >
                {/* Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                    <Wrench className="h-12 w-12 text-white" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-abyss-900 mb-4">
                    الموقع قيد الصيانة
                </h1>

                {/* Message */}
                <p className="text-abyss-600 mb-6 leading-relaxed">
                    نحن نعمل على تحسين الموقع حالياً. يرجى المحاولة مرة أخرى لاحقاً.
                </p>

                {/* Estimated time */}
                <div className="flex items-center justify-center gap-2 text-abyss-500 bg-abyss-50 px-4 py-3 rounded-xl">
                    <Clock className="h-5 w-5" />
                    <span>سنعود قريباً</span>
                </div>

                {/* Contact */}
                <p className="text-sm text-abyss-400 mt-6">
                    للطوارئ: <a href="mailto:support@arabshield.com" className="text-electric-600 hover:underline">support@arabshield.com</a>
                </p>
            </motion.div>
        </div>
    );
}
