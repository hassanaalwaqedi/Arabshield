/**
 * Dashboard Layout Component
 * Provides the main layout structure for all dashboard pages
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
    Loader2
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
    children: ReactNode;
}

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'نظرة عامة', labelEn: 'Overview' },
    { href: '/dashboard/projects', icon: FolderKanban, label: 'المشاريع', labelEn: 'Projects' },
    { href: '/dashboard/invoices', icon: FileText, label: 'الفواتير', labelEn: 'Invoices' },
    { href: '/dashboard/support', icon: MessageSquare, label: 'الدعم الفني', labelEn: 'Support' },
    { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات', labelEn: 'Settings' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, loading, isVerified, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

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
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                                ArabShield
                            </h2>

                            <nav className="space-y-2">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/dashboard'
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <LayoutDashboard size={20} />
                                    <span className="font-medium">الرئيسية</span>
                                </Link>

                                <Link
                                    href="/dashboard/projects"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/dashboard/projects'
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <FolderKanban size={20} />
                                    <span className="font-medium">المشاريع</span>
                                </Link>

                                <Link
                                    href="/dashboard/tasks"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/dashboard/tasks'
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <CheckSquare size={20} />
                                    <span className="font-medium">المهام</span>
                                </Link>

                                <Link
                                    href="/dashboard/invoices"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/dashboard/invoices'
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <FileText size={20} />
                                    <span className="font-medium">الفواتير</span>
                                </Link>

                                <Link
                                    href="/dashboard/support"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/dashboard/support'
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <MessageSquare size={20} />
                                    <span className="font-medium">الدعم الفني</span>
                                </Link>

                                <Link
                                    href="/dashboard/settings"
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/dashboard/settings'
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <Settings size={20} />
                                    <span className="font-medium">الإعدادات</span>
                                </Link>

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
