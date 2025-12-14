/**
 * Dashboard Layout Component
 * Provides the main layout structure for all dashboard pages
 * Role-aware navigation - shows admin items only to owners
 */

'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    FileText,
    MessageSquare,
    Settings,
    Menu,
    X,
    LogOut,
    Loader2,
    Users,
    Shield,
    Crown
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';

interface DashboardLayoutProps {
    children: ReactNode;
}

// Navigation items visible to ALL users
const commonNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'نظرة عامة' },
    { href: '/dashboard/projects', icon: FolderKanban, label: 'المشاريع' },
    { href: '/dashboard/tasks', icon: CheckSquare, label: 'المهام' },
    { href: '/dashboard/support', icon: MessageSquare, label: 'الدعم الفني' },
    { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
];

// Navigation items visible ONLY to admins (owner or admin role)
const adminOnlyNavItems = [
    { href: '/dashboard/invoices', icon: FileText, label: 'الفواتير' },
    { href: '/dashboard/admin/users', icon: Users, label: 'إدارة المستخدمين' },
    { href: '/dashboard/admin/settings', icon: Shield, label: 'إعدادات النظام' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, loading, isVerified, role, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    // Check if user has admin privileges (owner or admin role)
    const hasAdmin = isAdminRole(role);

    // Redirect if not authenticated or not verified
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (!isVerified) {
                router.push('/verify-email');
            }
        }
    }, [user, loading, isVerified, router]);

    // Handle logout
    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setLoggingOut(false);
        }
    };

    // Render navigation link
    const renderNavLink = (item: typeof commonNavItems[0], isActive: boolean) => (
        <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? 'bg-blue-600 text-white'
                : 'hover:bg-slate-100 text-slate-700'
                }`}
        >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
        </Link>
    );

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Don't render dashboard if not authenticated or not verified
    if (!user || !isVerified) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="fixed right-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-l border-slate-200 shadow-2xl z-40 lg:translate-x-0"
                    >
                        <div className="p-6">
                            {/* Header with Role Badge */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ArabShield
                                </h2>
                            </div>

                            {/* Role Badge */}
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-6 ${hasAdmin
                                ? 'bg-amber-50 border border-amber-200'
                                : 'bg-blue-50 border border-blue-200'
                                }`}>
                                <Crown size={16} className={hasAdmin ? 'text-amber-600' : 'text-blue-600'} />
                                <span className={`text-sm font-medium ${hasAdmin ? 'text-amber-700' : 'text-blue-700'
                                    }`}>
                                    {hasAdmin ? 'حساب المسؤول' : 'حساب العميل'}
                                </span>
                            </div>

                            <nav className="space-y-2">
                                {/* Common Navigation - Visible to ALL users */}
                                {commonNavItems.map((item) => {
                                    const isActive = pathname === item.href ||
                                        (item.href !== '/dashboard' && pathname.startsWith(item.href));
                                    return renderNavLink(item, isActive);
                                })}

                                {/* Admin-Only Navigation */}
                                {hasAdmin && (
                                    <>
                                        <div className="pt-4 mt-4 border-t border-slate-200">
                                            <p className="text-xs text-slate-500 font-semibold px-4 mb-2">
                                                إدارة النظام
                                            </p>
                                        </div>
                                        {adminOnlyNavItems.map((item) => {
                                            const isActive = pathname === item.href ||
                                                pathname.startsWith(item.href);
                                            return renderNavLink(item, isActive);
                                        })}
                                    </>
                                )}

                                {/* Logout Button */}
                                <div className="pt-4 mt-4 border-t border-slate-200">
                                    <button
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-red-600 hover:bg-red-50 disabled:opacity-50"
                                    >
                                        {loggingOut ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <LogOut size={20} />
                                        )}
                                        <span className="font-medium">تسجيل الخروج</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="lg:mr-64 p-4 lg:p-8">
                {children}
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
