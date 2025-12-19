/**
 * Dashboard Layout Component
 * REFACTORED: Flexbox-based layout with sidebar and content as siblings
 * 
 * ARCHITECTURE:
 * - Flex container: sidebar + main content side by side
 * - Desktop: Sidebar always visible, content fills remaining space
 * - Mobile: Sidebar is overlay drawer, content is full width
 * - RTL-safe: Uses logical properties (start/end)
 */

'use client';

import { ReactNode, useEffect, useCallback, useState } from 'react';
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
    Crown,
    Briefcase
} from 'lucide-react';
import { SimpleThemeToggle } from '@/components/ThemeToggle';
import { SimpleLanguageToggle } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';

interface DashboardLayoutProps {
    children: ReactNode;
}

// Sidebar width constants
const SIDEBAR_WIDTH = 256; // 16rem = 256px (w-64)

// Navigation items visible to ALL users
const commonNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'نظرة عامة' },
    { href: '/dashboard/projects', icon: FolderKanban, label: 'المشاريع' },
    { href: '/dashboard/tasks', icon: CheckSquare, label: 'المهام' },
    { href: '/dashboard/invoices', icon: FileText, label: 'الفواتير' },
    { href: '/careers', icon: Briefcase, label: 'الوظائف المتاحة' },
    { href: '/dashboard/support', icon: MessageSquare, label: 'الدعم الفني' },
    { href: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
];

// Navigation items visible ONLY to admins (owner or admin role)
const adminOnlyNavItems = [
    { href: '/dashboard/careers', icon: Briefcase, label: 'إدارة الوظائف' },
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
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent text-foreground'
                }`}
        >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
        </Link>
    );

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    // Don't render dashboard if not authenticated or not verified
    if (!user || !isVerified) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-background">
            {/* Mobile Menu Button - Optimized for touch (44x44px minimum) */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded={sidebarOpen}
                aria-label={sidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                className="md:hidden fixed top-4 start-4 z-50 p-3 bg-card rounded-xl shadow-lg border border-border hover:bg-accent transition-all active:scale-95"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay - Only on mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - Fixed on desktop LEFT side, drawer on mobile */}
            <aside
                className={`
                    fixed md:sticky top-0 h-screen
                    w-64 flex-shrink-0
                    bg-card/95 backdrop-blur-xl border-e border-border shadow-xl md:shadow-none
                    z-50 md:z-auto
                    transition-transform duration-300 ease-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    start-0
                `}
                style={{ width: SIDEBAR_WIDTH }}
                role="navigation"
                aria-label="Dashboard navigation"
            >
                <div className="p-6 h-full overflow-y-auto">
                    {/* Close button - Mobile only, on right side */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden absolute top-4 end-4 p-2 rounded-lg hover:bg-accent transition-colors"
                        aria-label="إغلاق القائمة"
                    >
                        <X size={20} className="text-muted-foreground" />
                    </button>

                    {/* Header with Role Badge, Theme Toggle, and Language Switcher */}
                    <div className="mb-6 mt-2 md:mt-0">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                NovaArab
                            </h2>
                            {hasAdmin && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full border border-amber-200 dark:border-amber-700">
                                    <Crown size={12} />
                                    {role === 'owner' ? 'مالك' : 'مدير'}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <SimpleLanguageToggle />
                            <SimpleThemeToggle />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="mb-6 p-4 bg-muted rounded-xl border border-border">
                        <p className="text-foreground font-medium">{user?.displayName || user?.email}</p>
                        <p className="text-sm text-muted-foreground mt-1 truncate">{user?.email}</p>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {/* Common navigation items - visible to all users */}
                        {commonNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return renderNavLink(item, isActive);
                        })}

                        {/* Admin-only navigation items */}
                        {hasAdmin && (
                            <>
                                <div className="my-4 pt-4 border-t border-border">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4">
                                        إدارة النظام
                                    </p>
                                </div>
                                {adminOnlyNavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-accent text-foreground'
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
                        <div className="pt-4 mt-4 border-t border-border">
                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-destructive hover:bg-destructive/10 disabled:opacity-50"
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

            {/* Main Content - Flex-1 to fill remaining space */}
            <main className="flex-1 min-h-screen w-full max-w-full overflow-x-hidden p-4 lg:p-8">
                {children}
            </main>
        </div>
    );
}
