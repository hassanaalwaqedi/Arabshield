/**
 * Dashboard Layout Component
 * MOBILE-FIRST: Optimized for mobile devices with responsive sidebar drawer
 * i18n: All text using useTranslations hook
 */

'use client';

import { ReactNode, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
    Briefcase,
    User
} from 'lucide-react';
import { SimpleThemeToggle } from '@/components/ThemeToggle';
import { SimpleLanguageToggle } from '@/components/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';

interface DashboardLayoutProps {
    children: ReactNode;
}

// Sidebar width constants
const SIDEBAR_WIDTH = 280;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, loading, isVerified, role, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const t = useTranslations('dashboard');

    // Navigation items with translation keys
    const commonNavItems = [
        { href: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.overview' },
        { href: '/dashboard/projects', icon: FolderKanban, labelKey: 'nav.projects' },
        { href: '/dashboard/tasks', icon: CheckSquare, labelKey: 'nav.tasks' },
        { href: '/dashboard/invoices', icon: FileText, labelKey: 'nav.invoices' },
        { href: '/careers', icon: Briefcase, labelKey: 'nav.careers' },
        { href: '/dashboard/support', icon: MessageSquare, labelKey: 'nav.support' },
        { href: '/dashboard/settings', icon: Settings, labelKey: 'nav.settings' },
    ];

    const adminOnlyNavItems = [
        { href: '/dashboard/careers', icon: Briefcase, labelKey: 'nav.manageJobs' },
        { href: '/dashboard/admin/invoices', icon: FileText, labelKey: 'nav.manageInvoices' },
        { href: '/dashboard/admin/users', icon: Users, labelKey: 'nav.manageUsers' },
        { href: '/dashboard/admin/settings', icon: Shield, labelKey: 'nav.systemSettings' },
    ];

    // Get page title based on pathname
    const getPageTitle = (path: string): string => {
        const pathMap: Record<string, string> = {
            '/dashboard': t('nav.overview'),
            '/dashboard/projects': t('nav.projects'),
            '/dashboard/tasks': t('nav.tasks'),
            '/dashboard/invoices': t('nav.invoices'),
            '/dashboard/support': t('nav.support'),
            '/dashboard/settings': t('nav.settings'),
            '/dashboard/notifications': t('title'),
            '/dashboard/careers': t('nav.manageJobs'),
            '/dashboard/admin/invoices': t('nav.manageInvoices'),
            '/dashboard/admin/users': t('nav.manageUsers'),
            '/dashboard/admin/settings': t('nav.systemSettings'),
        };
        return pathMap[path] || t('title');
    };

    const hasAdmin = isAdminRole(role);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

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

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && sidebarOpen) {
            setSidebarOpen(false);
        }
    }, [sidebarOpen]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (!isVerified) {
                router.push('/verify-email');
            }
        }
    }, [user, loading, isVerified, router]);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await logout();
            router.push('/login');
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Logout error:', error);
            }
            setLoggingOut(false);
        }
    };

    const renderNavLink = (item: typeof commonNavItems[0], isActive: boolean) => (
        <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`
                flex items-center gap-3 px-4 py-4 rounded-xl transition-all
                min-h-[52px] touch-manipulation
                ${isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-accent text-foreground active:bg-accent/80'
                }
            `}
        >
            <item.icon size={22} className="flex-shrink-0" />
            <span className="font-medium text-base">{t(item.labelKey)}</span>
        </Link>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!user || !isVerified) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-background">
            {/* Mobile Sticky Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-card/95 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 safe-area-inset">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-expanded={sidebarOpen}
                    className="p-3 -ml-2 rounded-xl hover:bg-accent transition-colors active:scale-95 touch-manipulation"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <h1 className="text-lg font-bold text-foreground truncate max-w-[200px]">
                    {getPageTitle(pathname)}
                </h1>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || <User size={20} />}
                </div>
            </header>

            {/* Overlay */}
            <div
                className={`
                    md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 
                    transition-opacity duration-300
                    ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:sticky top-0 h-screen
                    flex-shrink-0
                    bg-card/95 backdrop-blur-xl border-e border-border shadow-xl md:shadow-none
                    z-50 md:z-auto
                    transition-transform duration-300 ease-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    start-0
                    w-[280px]
                `}
                style={{ width: SIDEBAR_WIDTH }}
                role="navigation"
            >
                <div className="p-4 md:p-6 h-full overflow-y-auto overscroll-contain">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden absolute top-4 end-4 p-3 rounded-xl hover:bg-accent transition-colors active:scale-95 touch-manipulation"
                    >
                        <X size={22} className="text-muted-foreground" />
                    </button>

                    <div className="mb-6 mt-12 md:mt-0">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                NovaArab
                            </h2>
                            {hasAdmin && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full border border-amber-200 dark:border-amber-700">
                                    <Crown size={12} />
                                    {role === 'owner' ? t('nav.owner') : t('nav.admin')}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <SimpleLanguageToggle />
                            <SimpleThemeToggle />
                        </div>
                    </div>

                    <div className="mb-6 p-4 bg-muted rounded-2xl border border-border">
                        <p className="text-foreground font-semibold text-base">{user?.displayName || user?.email}</p>
                        <p className="text-sm text-muted-foreground mt-1 truncate">{user?.email}</p>
                    </div>

                    <nav className="space-y-2">
                        {commonNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return renderNavLink(item, isActive);
                        })}

                        {hasAdmin && (
                            <>
                                <div className="my-6 pt-4 border-t border-border">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
                                        {t('nav.adminSection')}
                                    </p>
                                </div>
                                {adminOnlyNavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`
                                                flex items-center gap-3 px-4 py-4 rounded-xl transition-all
                                                min-h-[52px] touch-manipulation
                                                ${isActive
                                                    ? 'bg-primary text-primary-foreground font-semibold'
                                                    : 'hover:bg-accent text-foreground active:bg-accent/80'
                                                }
                                            `}
                                        >
                                            <item.icon size={22} className="flex-shrink-0" />
                                            <span className="font-medium text-base">{t(item.labelKey)}</span>
                                        </Link>
                                    );
                                })}
                            </>
                        )}

                        <div className="pt-6 mt-6 border-t border-border">
                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all w-full text-destructive hover:bg-destructive/10 active:bg-destructive/20 disabled:opacity-50 min-h-[52px] touch-manipulation"
                            >
                                {loggingOut ? (
                                    <Loader2 size={22} className="animate-spin flex-shrink-0" />
                                ) : (
                                    <LogOut size={22} className="flex-shrink-0" />
                                )}
                                <span className="font-medium text-base">{t('nav.logout')}</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen w-full max-w-full overflow-x-hidden pt-16 md:pt-0">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
