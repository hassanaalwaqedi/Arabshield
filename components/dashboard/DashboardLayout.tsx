/**
 * Dashboard Layout Component
 * Provides the main layout structure for all dashboard pages
 * Role-aware navigation - shows admin items only to owners
 * 
 * MOBILE-FIRST SIDEBAR:
 * - Hidden by default on mobile (<lg)
 * - Opens as overlay drawer (max 80% width)
 * - Closes on: outside click, route change, X button, ESC key
 * - Desktop: fixed sidebar, no overlay
 */

'use client';

import { ReactNode, useEffect, useCallback } from 'react';
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
    { href: '/dashboard/invoices', icon: FileText, label: 'الفواتير' },
    { href: '/dashboard/support', icon: MessageSquare, label: 'الدعم الفني' },
    { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
];

// Navigation items visible ONLY to admins (owner or admin role)
const adminOnlyNavItems = [
    { href: '/dashboard/admin/invoices', icon: FileText, label: 'إدارة الفواتير' },
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

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [sidebarOpen]);

    // Handle ESC key to close sidebar
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && sidebarOpen) {
            setSidebarOpen(false);
        }
    }, [sidebarOpen]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

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
            {/* Mobile Menu Button - Only visible on mobile */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded={sidebarOpen}
                aria-label={sidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                className="lg:hidden fixed top-4 right-4 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Overlay - Only on mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed right-0 top-0 h-screen w-[80%] max-w-[280px] lg:w-64
                    bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl
                    z-50 lg:z-30
                    transform transition-transform duration-300 ease-out
                    ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <div className="p-6 h-full overflow-y-auto">
                    {/* Close button - Mobile only */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden absolute top-4 left-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="إغلاق القائمة"
                    >
                        <X size={20} className="text-slate-600" />
                    </button>

                    {/* Header with Role Badge */}
                    <div className="flex items-center justify-between mb-6 mt-2 lg:mt-0">
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
                            return (
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
                                    return (
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
            </aside>

            {/* Main Content - Full width on mobile, offset on desktop */}
            <main className="w-full lg:mr-64 min-h-screen p-4 lg:p-8">
                {children}
            </main>
        </div>
    );
}

