"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Home,
    Briefcase,
    FileText,
    Users,
    BrainCircuit,
    Book,
    ShoppingCart,
    Menu,
    X,
    ChevronRight,
    Layers,
    Bot,
    Info,
    Sparkles,
    Mail,
    DollarSign,
    Shield,
    UserPlus,
    FileCheck,
    LayoutDashboard,
    Settings,
    Receipt,
    Crown,
    HelpCircle,
    Play,
    AlertCircle,
    BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';

// Types for menu items with role restrictions
interface MenuItem {
    name: string;
    icon: React.ElementType;
    path: string;
    requiresRole?: string[];
}

// Sidebar dimensions
const SIDEBAR_WIDTH_OPEN = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;

const menuItems: MenuItem[] = [
    { name: 'الرئيسية', icon: Home, path: '/' },
    { name: 'من نحن', icon: Info, path: '/about' },
    { name: 'الخدمات', icon: Sparkles, path: '/services' },
    { name: 'الأسعار', icon: DollarSign, path: '/pricing' },
    { name: 'دراسات الحالة', icon: Briefcase, path: '/case-studies' },
    { name: 'معرض الأعمال', icon: Layers, path: '/portfolio' },
    { name: 'الحلول الذكية', icon: Bot, path: '/ai-solutions' },
    { name: 'توثيق AI', icon: Book, path: '/ai-docs' },
    { name: 'المدونة', icon: FileText, path: '/blog' },
    { name: 'الشركاء', icon: Users, path: '/partners' },
    { name: 'الأسئلة الشائعة', icon: HelpCircle, path: '/faq' },
    { name: 'التوثيق', icon: BookOpen, path: '/docs' },
    { name: 'دروس الفيديو', icon: Play, path: '/tutorials' },
    { name: 'المشاكل الشائعة', icon: AlertCircle, path: '/issues' },
    { name: 'لوحة التحكم', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'الفواتير', icon: Receipt, path: '/dashboard/invoices' },
    { name: 'طلب خدمة', icon: ShoppingCart, path: '/order' },
    { name: 'تواصل معنا', icon: Mail, path: '/contact' },
];

const additionalPages: MenuItem[] = [
    { name: 'سياسة الخصوصية', icon: Shield, path: '/privacy-policy' },
    { name: 'التسجيل', icon: UserPlus, path: '/register' },
    { name: 'الشروط والأحكام', icon: FileCheck, path: '/terms' },
];

// Admin-only menu items
const adminItems: MenuItem[] = [
    { name: 'الطلبات الواردة', icon: ShoppingCart, path: '/dashboard/admin/orders', requiresRole: ['owner', 'admin'] },
    { name: 'الرسائل', icon: Mail, path: '/dashboard/admin/messages', requiresRole: ['owner', 'admin'] },
    { name: 'إدارة الفواتير', icon: Receipt, path: '/dashboard/admin/invoices', requiresRole: ['owner', 'admin'] },
    { name: 'إدارة المستخدمين', icon: Users, path: '/dashboard/admin/users', requiresRole: ['owner', 'admin'] },
    { name: 'إعدادات النظام', icon: Settings, path: '/dashboard/admin/settings', requiresRole: ['owner', 'admin'] },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile, closeMobile } = useSidebar();
    const { role } = useAuth();

    const sidebarWidth = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

    // Filter menu items based on user role
    const filterByRole = (items: MenuItem[]) => {
        return items.filter(item => {
            if (!item.requiresRole) return true;
            if (!role) return false;
            return item.requiresRole.includes(role);
        });
    };

    const filteredMenuItems = filterByRole(menuItems);
    const filteredAdminItems = filterByRole(adminItems);
    const isAdmin = isAdminRole(role);

    return (
        <>
            {/* Mobile Toggle Button - Left side for RTL */}
            <button
                onClick={toggleMobile}
                className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-abyss-900/95 backdrop-blur-sm border border-slate-700/50 text-white shadow-lg hover:bg-abyss-800 transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeMobile}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - RIGHT side for RTL */}
            <aside
                style={{ width: sidebarWidth }}
                className={`
                    fixed top-0 right-0 h-screen z-50
                    bg-abyss-950/95 backdrop-blur-xl
                    border-l border-slate-800/50
                    flex flex-col
                    transition-all duration-300 ease-out
                    ${isMobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                `}
            >
                {/* Logo Area */}
                <div className={`
                    flex items-center h-16 border-b border-slate-800/50
                    ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'}
                `}>
                    <Link href="/" className="flex items-center gap-2.5" onClick={closeMobile}>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-500 to-neon-600 flex items-center justify-center shadow-lg shadow-electric-500/20 flex-shrink-0">
                            <BrainCircuit className="w-5 h-5 text-white" />
                        </div>
                        {!isCollapsed && (
                            <span className="font-bold text-lg text-white tracking-tight whitespace-nowrap">
                                ArabShield
                            </span>
                        )}
                    </Link>

                    {/* Desktop Collapse Toggle */}
                    {!isCollapsed && (
                        <button
                            onClick={toggleCollapse}
                            className="hidden md:flex p-1.5 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
                            aria-label="Collapse sidebar"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                    )}
                </div>

                {/* Expand button when collapsed */}
                {isCollapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex mx-auto mt-3 p-1.5 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
                        aria-label="Expand sidebar"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
                    {/* Main Menu Items */}
                    <ul className="space-y-1">
                        {filteredMenuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        onClick={closeMobile}
                                        className={`
                                            group flex items-center rounded-xl transition-all duration-200 relative
                                            ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 gap-3'}
                                            ${isActive
                                                ? 'bg-electric-500/10 text-electric-400'
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                            }
                                        `}
                                    >
                                        <item.icon className={`
                                            w-5 h-5 flex-shrink-0 transition-colors
                                            ${isActive ? 'text-electric-400' : 'text-slate-500 group-hover:text-white'}
                                        `} />

                                        {!isCollapsed && (
                                            <span className="font-medium text-sm truncate">{item.name}</span>
                                        )}

                                        {/* Active indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-electric-500 rounded-l-none rounded-r-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}

                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <div className="
                                                absolute left-full mr-2 px-2.5 py-1.5
                                                bg-abyss-900 text-white text-xs font-medium
                                                rounded-lg shadow-xl border border-slate-700/50
                                                opacity-0 group-hover:opacity-100
                                                pointer-events-none whitespace-nowrap
                                                transition-opacity duration-200
                                                z-50
                                            ">
                                                {item.name}
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Divider */}
                    <div className="my-4 mx-2">
                        <div className="border-t border-slate-800/50" />
                        {!isCollapsed && (
                            <p className="text-xs text-slate-600 mt-3 px-1 font-medium">صفحات إضافية</p>
                        )}
                    </div>

                    {/* Additional Pages */}
                    <ul className="space-y-1">
                        {additionalPages.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        onClick={closeMobile}
                                        className={`
                                            group flex items-center rounded-xl transition-all duration-200 relative
                                            ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 gap-3'}
                                            ${isActive
                                                ? 'bg-electric-500/10 text-electric-400'
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                            }
                                        `}
                                    >
                                        <item.icon className={`
                                            w-5 h-5 flex-shrink-0 transition-colors
                                            ${isActive ? 'text-electric-400' : 'text-slate-500 group-hover:text-white'}
                                        `} />

                                        {!isCollapsed && (
                                            <span className="font-medium text-sm truncate">{item.name}</span>
                                        )}

                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <div className="
                                                absolute left-full mr-2 px-2.5 py-1.5
                                                bg-abyss-900 text-white text-xs font-medium
                                                rounded-lg shadow-xl border border-slate-700/50
                                                opacity-0 group-hover:opacity-100
                                                pointer-events-none whitespace-nowrap
                                                transition-opacity duration-200
                                                z-50
                                            ">
                                                {item.name}
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Admin Section - Only visible for owner/admin roles */}
                    {isAdmin && filteredAdminItems.length > 0 && (
                        <>
                            {/* Divider */}
                            <div className="my-4 mx-2">
                                <div className="border-t border-amber-500/30" />
                                {!isCollapsed && (
                                    <div className="flex items-center gap-2 mt-3 px-1">
                                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                                        <p className="text-xs text-amber-500 font-medium">منطقة الإدارة</p>
                                    </div>
                                )}
                            </div>

                            {/* Admin Menu Items */}
                            <ul className="space-y-1">
                                {filteredAdminItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                href={item.path}
                                                onClick={closeMobile}
                                                className={`
                                                    group flex items-center rounded-xl transition-all duration-200 relative
                                                    ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 gap-3'}
                                                    ${isActive
                                                        ? 'bg-amber-500/10 text-amber-400'
                                                        : 'text-slate-400 hover:bg-amber-500/10 hover:text-amber-300'
                                                    }
                                                `}
                                            >
                                                <item.icon className={`
                                                    w-5 h-5 flex-shrink-0 transition-colors
                                                    ${isActive ? 'text-amber-400' : 'text-amber-500/50 group-hover:text-amber-400'}
                                                `} />

                                                {!isCollapsed && (
                                                    <span className="font-medium text-sm truncate">{item.name}</span>
                                                )}

                                                {/* Active indicator for admin items */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="sidebar-admin-active"
                                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-500 rounded-l-none rounded-r-full"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}

                                                {/* Tooltip for collapsed state */}
                                                {isCollapsed && (
                                                    <div className="
                                                        absolute left-full mr-2 px-2.5 py-1.5
                                                        bg-abyss-900 text-amber-300 text-xs font-medium
                                                        rounded-lg shadow-xl border border-amber-500/30
                                                        opacity-0 group-hover:opacity-100
                                                        pointer-events-none whitespace-nowrap
                                                        transition-opacity duration-200
                                                        z-50
                                                    ">
                                                        {item.name}
                                                    </div>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </nav>

                {/* Bottom CTA */}
                <div className="p-3 border-t border-slate-800/50">
                    <Link href="/order" onClick={closeMobile}>
                        <Button
                            variant="glow"
                            size="sm"
                            className={`
                                w-full transition-all duration-200
                                ${isCollapsed ? 'px-0 justify-center' : 'justify-center gap-2'}
                            `}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {!isCollapsed && <span>اطلب خدمة</span>}
                        </Button>
                    </Link>
                </div>
            </aside>
        </>
    );
}

// Export constants for use in layout
export { SIDEBAR_WIDTH_OPEN, SIDEBAR_WIDTH_COLLAPSED };
