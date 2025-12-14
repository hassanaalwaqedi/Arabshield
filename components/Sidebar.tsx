"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
    ChevronLeft,
    Layers,
    Bot,
    Info,
    Sparkles,
    Mail,
    DollarSign,
    Shield,
    UserPlus,
    FileCheck,
    LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const menuItems = [
    { name: 'الرئيسية', icon: Home, path: '/' },
    { name: 'من نحن', icon: Info, path: '/about' },
    { name: 'الخدمات', icon: Sparkles, path: '/services' },
    { name: 'دراسات الحالة', icon: Briefcase, path: '/case-studies' },
    { name: 'معرض الأعمال', icon: Layers, path: '/portfolio' },
    { name: 'الحلول الذكية', icon: Bot, path: '/ai-solutions' },
    { name: 'توثيق AI', icon: Book, path: '/ai-docs' },
    { name: 'المدونة', icon: FileText, path: '/blog' },
    { name: 'الشركاء', icon: Users, path: '/partners' },
    { name: 'لوحة التحكم', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'طلب خدمة', icon: ShoppingCart, path: '/order' },
    { name: 'تواصل معنا', icon: Mail, path: '/contact' },
];

const additionalPages = [
    { name: 'الأسعار', icon: DollarSign, path: '/pricing' },
    { name: 'سياسة الخصوصية', icon: Shield, path: '/privacy-policy' },
    { name: 'التسجيل', icon: UserPlus, path: '/register' },
    { name: 'الشروط والأحكام', icon: FileCheck, path: '/terms' },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-900 border border-slate-800 text-white shadow-lg"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Backdrop for Mobile */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? 80 : 280,
                    x: isMobileOpen ? 0 : '100%' // Start off-screen on mobile (right side for RTL context usually, but requested Left physical)
                }}
                // Override for desktop to always show, and mobile to slide in
                style={{ x: 0 }}
                className={`
                    fixed top-0 left-0 h-screen bg-slate-950 border-r border-slate-800 z-50 flex flex-col transition-all duration-300
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                {/* Logo Area */}
                <div className={`flex items-center h-20 px-6 border-b border-slate-800 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <BrainCircuit className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">NovaArabia</span>
                        </Link>
                    )}
                    {isCollapsed && (
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <BrainCircuit className="w-6 h-6 text-white" />
                        </div>
                    )}

                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors absolute -right-3 top-8 border border-slate-700 bg-slate-950 cursor-pointer"
                    >
                        <ChevronLeft className={`w-3 h-3 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                    {/* Main Menu Items */}
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} onClick={() => setIsMobileOpen(false)}>
                                <div className={`
                                    flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative
                                    ${isActive
                                        ? 'bg-blue-600/10 text-blue-400'
                                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}>
                                    <item.icon className={`
                                        w-5 h-5 transition-colors
                                        ${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-white'}
                                        ${isCollapsed ? '' : 'ml-3'}
                                    `} />

                                    {!isCollapsed && (
                                        <span className="font-medium text-sm">{item.name}</span>
                                    )}

                                    {/* Active Indicator Line */}
                                    {isActive && !isCollapsed && (
                                        <motion.div
                                            layoutId="active-nav"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"
                                        />
                                    )}

                                    {/* Tooltip for Collapsed State */}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-2 px-3 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700 transition-opacity">
                                            {item.name}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div className="py-3">
                        <div className="border-t border-slate-800"></div>
                        {!isCollapsed && (
                            <p className="text-xs text-slate-600 mt-3 px-3 font-semibold">صفحات إضافية</p>
                        )}
                    </div>

                    {/* Additional Pages */}
                    {additionalPages.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} onClick={() => setIsMobileOpen(false)}>
                                <div className={`
                                    flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative
                                    ${isActive
                                        ? 'bg-blue-600/10 text-blue-400'
                                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}>
                                    <item.icon className={`
                                        w-5 h-5 transition-colors
                                        ${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-white'}
                                        ${isCollapsed ? '' : 'ml-3'}
                                    `} />

                                    {!isCollapsed && (
                                        <span className="font-medium text-sm">{item.name}</span>
                                    )}

                                    {/* Active Indicator Line */}
                                    {isActive && !isCollapsed && (
                                        <motion.div
                                            layoutId="active-nav-additional"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"
                                        />
                                    )}

                                    {/* Tooltip for Collapsed State */}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-2 px-3 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700 transition-opacity">
                                            {item.name}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA (Order) */}
                <div className="p-4 border-t border-slate-800">
                    <Link href="/order" onClick={() => setIsMobileOpen(false)}>
                        <Button
                            variant="glow"
                            className={`w-full ${isCollapsed ? 'px-0 justify-center' : 'justify-start gap-3'}`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {!isCollapsed && "اطلب خدمة"}
                        </Button>
                    </Link>
                </div>

            </motion.aside>
        </>
    );
}
