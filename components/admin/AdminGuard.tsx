/**
 * Admin Role Guard Component
 * Provides a reusable wrapper for admin-only content
 * Uses isAdminRole from lib/admin.ts
 */

'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';
import { Loader2, AlertCircle, Shield } from 'lucide-react';

interface AdminGuardProps {
    children: ReactNode;
    fallbackUrl?: string;
}

/**
 * Wraps content that should only be visible to admins/owners
 * Redirects non-admins to the specified fallback URL
 */
export function AdminGuard({ children, fallbackUrl = '/dashboard' }: AdminGuardProps) {
    const router = useRouter();
    const { loading, role } = useAuth();

    // UI-level role protection
    useEffect(() => {
        if (!loading && !isAdminRole(role)) {
            router.push(fallbackUrl);
        }
    }, [loading, role, router, fallbackUrl]);

    // Show loading while checking
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Show access denied if not admin
    if (!isAdminRole(role)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg text-red-600">ليس لديك صلاحية الوصول لهذه الصفحة</p>
            </div>
        );
    }

    return <>{children}</>;
}

/**
 * Badge showing admin-only status
 */
export function AdminBadge() {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg w-fit">
            <Shield size={16} className="text-amber-600" />
            <span className="text-sm font-medium text-amber-700">صفحة مخصصة للمسؤولين فقط</span>
        </div>
    );
}
