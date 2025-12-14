"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, ChevronDown, Sparkles, Zap, Code, Smartphone, Cloud, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    {
        name: 'الخدمات',
        href: '/services',
        hasDropdown: true,
        dropdownItems: [
            { name: 'Web Development', href: '/services/web', icon: Code },
            { name: 'Mobile Apps', href: '/services/mobile', icon: Smartphone },
            { name: 'Cloud Solutions', href: '/services/cloud', icon: Cloud },
            { name: 'Cybersecurity', href: '/services/security', icon: Lock },
        ]
    },
    { name: 'الأسعار', href: '/pricing' },
    { name: 'اتصل بنا', href: '/contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        if (activeDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [activeDropdown]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-blue-500/5'
                : 'bg-transparent'
                }`}
        >
            {/* Top Bar - Promotional */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center py-2 text-sm font-medium">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>عرض محدود: احصل على خصم 20% على جميع المشاريع هذا الشهر!</span>
                    <Link href="/pricing" className="underline hover:no-underline ml-2">
                        تعرف على المزيد ←
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-blue-600 to-purple-500 p-2 rounded-xl shadow-lg shadow-blue-500/50">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                عرب شيلد
                            </span>
                            <span className="text-xs text-slate-400 -mt-1">حلول تقنية</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative">
                                {item.hasDropdown ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveDropdown(activeDropdown === item.name ? null : item.name);
                                        }}
                                        className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors group"
                                    >
                                        {item.name}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                                                }`}
                                        />
                                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="relative px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors group"
                                    >
                                        {item.name}
                                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {item.hasDropdown && activeDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden"
                                        >
                                            <div className="p-2">
                                                {item.dropdownItems?.map((dropItem, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={dropItem.href}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
                                                            <dropItem.icon className="w-5 h-5 text-blue-400" />
                                                        </div>
                                                        <span className="font-medium">{dropItem.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-t border-white/5">
                                                <Link
                                                    href="/services"
                                                    className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    عرض جميع الخدمات
                                                    <Zap className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">تسجيل الدخول</Button>
                        </Link>
                        <Link href="/order">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    ابدأ مشروعك
                                </Button>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden relative p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} className="text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} className="text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-slate-900/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.hasDropdown ? (
                                        <div className="space-y-1">
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                            >
                                                {item.name}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {activeDropdown === item.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="pl-4 space-y-1 overflow-hidden"
                                                    >
                                                        {item.dropdownItems?.map((dropItem, idx) => (
                                                            <Link
                                                                key={idx}
                                                                href={dropItem.href}
                                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                                onClick={() => {
                                                                    setIsOpen(false);
                                                                    setActiveDropdown(null);
                                                                }}
                                                            >
                                                                <dropItem.icon className="w-4 h-4 text-blue-400" />
                                                                {dropItem.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}

                            {/* Mobile CTA Buttons */}
                            <div className="pt-4 space-y-3 px-4">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="block">
                                    <Button variant="outline" size="md" className="w-full border-white/20 text-white hover:bg-white/5">تسجيل الدخول للوحة التحكم</Button>
                                </Link>
                                <Link href="/order" onClick={() => setIsOpen(false)} className="block">
                                    <Button variant="primary" size="md" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        ابدأ مشروعك
                                    </Button>
                                </Link>
                            </div>

                            {/* Mobile Quick Links */}
                            <div className="pt-6 mt-6 border-t border-white/10">
                                <div className="px-4 flex items-center justify-between text-xs text-slate-500">
                                    <span>Need help?</span>
                                    <Link
                                        href="/contact"
                                        className="text-blue-400 hover:text-blue-300 font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contact Support →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}