"use client";

import Link from 'next/link';
import { Shield, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const quickLinks = [
        { href: '/about', label: 'About Us' },
        { href: '/services', label: 'Our Services' },
        { href: '/pricing', label: 'Pricing Plans' },
        { href: '/careers', label: 'Careers', badge: 'Hiring' },
    ];

    const resources = [
        { href: '/support', label: 'Support Center' },
        { href: '/faq', label: 'FAQs' },
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-500/20 hover:text-blue-400' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500/20 hover:text-sky-400' },
        { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:text-pink-400' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600/20 hover:text-blue-500' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

                {/* Floating Particles - Using deterministic positions to avoid hydration mismatch */}
                <div className="absolute inset-0">
                    {[
                        { left: 15, top: 20, delay: 0.1, duration: 3.5 },
                        { left: 45, top: 35, delay: 0.5, duration: 4.2 },
                        { left: 75, top: 15, delay: 0.8, duration: 3.8 },
                        { left: 25, top: 60, delay: 1.2, duration: 4.5 },
                        { left: 85, top: 45, delay: 0.3, duration: 3.2 },
                        { left: 55, top: 80, delay: 1.5, duration: 4.0 },
                        { left: 10, top: 75, delay: 0.7, duration: 3.6 },
                        { left: 65, top: 55, delay: 1.0, duration: 4.3 },
                        { left: 35, top: 90, delay: 1.8, duration: 3.4 },
                        { left: 90, top: 70, delay: 0.4, duration: 4.1 },
                    ].map((particle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                            style={{
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Premium Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 pb-20 border-b border-white/5"
                >
                    <div className="relative max-w-4xl mx-auto">
                        {/* Decorative Elements */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border border-dashed border-blue-500/20 rounded-full"
                            />
                        </div>

                        <div className="relative bg-gradient-to-br from-blue-950/50 via-slate-900/50 to-purple-950/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12 shadow-2xl shadow-blue-500/5">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl" />

                            <div className="relative text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
                                >
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-medium text-blue-400">انضم لأكثر من 10,000 مشترك</span>
                                </motion.div>

                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                    ابقَ في المقدمة
                                </h3>
                                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                                    احصل على رؤى حصرية، اتجاهات السوق، وحلول مبتكرة مباشرة إلى بريدك الإلكتروني.
                                </p>

                                {!isSubscribed ? (
                                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                        <div className="relative flex-1 group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                            <Input
                                                type="email"
                                                placeholder="أدخل بريدك الإلكتروني"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 rounded-xl"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                                        >
                                            اشترك <Zap className="mr-2 h-4 w-4" />
                                        </Button>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex items-center justify-center gap-3 py-4 px-6 bg-green-500/10 border border-green-500/20 rounded-xl max-w-lg mx-auto"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <motion.div
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <motion.path
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <span className="text-green-400 font-medium">تم الاشتراك بنجاح! تحقق من بريدك الإلكتروني.</span>
                                    </motion.div>
                                )}

                                <p className="text-xs text-slate-500 mt-4">
                                    بالاشتراك، أنت توافق على سياسة الخصوصية الخاصة بنا وتوافق على تلقي التحديثات.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column - Wider */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <Link href="/" className="inline-flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                                    <Shield className="h-7 w-7 text-white" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                ArabShield
                            </span>
                        </Link>

                        <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                            نمكّن الشركات بحلول رقمية متطورة. من البرمجيات المخصصة إلى تطبيقات الجوال، نبني مستقبل التكنولوجيا في العالم العربي.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-2">
                            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-white">500+</div>
                                <div className="text-xs text-slate-400">مشاريع</div>
                            </div>
                            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-white">98%</div>
                                <div className="text-xs text-slate-400">رضا العملاء</div>
                            </div>
                            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-white">24/7</div>
                                <div className="text-xs text-slate-400">دعم</div>
                            </div>
                        </div>

                        {/* Social Links - Enhanced */}
                        <div className="pt-4">
                            <p className="text-sm font-semibold text-white mb-3">تابعنا</p>
                            <div className="flex gap-3">
                                {socialLinks.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        aria-label={social.label}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-slate-400 transition-all ${social.color}`}
                                    >
                                        <social.icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                            الشركة
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>من نحن</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>خدماتنا</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>خطط الأسعار</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>الوظائف</span>
                                    <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                                        توظيف
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                            الموارد
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/support"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>مركز الدعم</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>الأسئلة الشائعة</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>سياسة الخصوصية</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    <span>شروط الخدمة</span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-4"
                    >
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                            تواصل معنا
                        </h3>
                        <div className="space-y-4">
                            <motion.a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 4 }}
                                className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                    <MapPin size={18} className="text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-slate-500 mb-1">موقع المكتب</div>
                                    <div className="text-sm text-slate-300">حي التقنية 123، شارع الابتكار، الرياض 11564، المملكة العربية السعودية</div>
                                </div>
                            </motion.a>

                            <motion.a
                                href="mailto:hello@arabshield.com"
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                                    <Mail size={18} className="text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-slate-500 mb-1">راسلنا عبر البريد الإلكتروني</div>
                                    <div className="text-sm text-slate-300">hello@arabshield.com</div>
                                </div>
                            </motion.a>

                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                    <Phone size={18} className="text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-slate-500 mb-1">اتصل بنا</div>
                                    <div className="text-sm text-slate-300">+90 537 280 71 33</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Enhanced Bottom Bar */}
                <div className="border-t border-white/5 pt-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500">
                            <p className="flex items-center gap-2">
                                <span>&copy; {new Date().getFullYear()} ArabShield Technologies.</span>
                                <span className="hidden sm:inline">•</span>
                                <span>جميع الحقوق محفوظة.</span>
                            </p>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <Globe className="w-3 h-3 text-blue-400" />
                                <span className="text-xs">صنع بحب ❤️ في المملكة العربية السعودية</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <Link
                                href="/privacy-policy"
                                className="text-slate-500 hover:text-white transition-colors relative group"
                            >
                                الخصوصية
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all" />
                            </Link>
                            <Link
                                href="/terms"
                                className="text-slate-500 hover:text-white transition-colors relative group"
                            >
                                الشروط
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all" />
                            </Link>
                            <Link
                                href="/sitemap"
                                className="text-slate-500 hover:text-white transition-colors relative group"
                            >
                                خريطة الموقع
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all" />
                            </Link>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 pt-8 border-t border-white/5"
                    >
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
                            <div className="text-xs text-slate-600 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                محمي بـ SSL
                            </div>
                            <div className="text-xs text-slate-600 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                متوافق مع GDPR
                            </div>
                            <div className="text-xs text-slate-600 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                معتمد ISO 27001
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}