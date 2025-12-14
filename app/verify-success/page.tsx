'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function VerifySuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Check if user is authenticated and verified
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Reload user to get latest emailVerified status
                await user.reload();

                if (!user.emailVerified) {
                    // Email not verified yet, redirect to verify-email page
                    router.push('/verify-email');
                }
            } else {
                // Not logged in, redirect to login
                router.push('/login');
            }
        });

        // Countdown timer for auto-redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/dashboard');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            unsubscribe();
            clearInterval(timer);
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/5 to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-600/20 via-slate-950 to-slate-950"></div>

            {/* Floating Success Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-2xl w-full">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-600/50 mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                            ArabShield
                        </h1>
                    </div>

                    {/* Success Card */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 text-center">
                        {/* Success Icon with Animation */}
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/50">
                                <CheckCircle className="w-12 h-12 text-white animate-bounce" style={{ animationDuration: '2s' }} />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                                <Sparkles className="w-4 h-4 text-yellow-900" />
                            </div>
                        </div>

                        {/* Success Message */}
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            تم التفعيل بنجاح! 🎉
                        </h2>
                        <p className="text-2xl text-green-600 font-semibold mb-6">
                            Email Verified Successfully!
                        </p>

                        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                            <h3 className="font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                تم تفعيل حسابك
                            </h3>
                            <p className="text-slate-700 leading-relaxed">
                                يمكنك الآن الوصول إلى جميع خدمات ArabShield والبدء في استخدام لوحة التحكم.
                                <br />
                                <span className="text-sm text-slate-600">
                                    You can now access all ArabShield services and start using your dashboard.
                                </span>
                            </p>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                            <h3 className="font-bold text-slate-900 mb-3">الخطوات التالية:</h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">1.</span>
                                    <span>استكشف لوحة التحكم وجميع الميزات المتاحة</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">2.</span>
                                    <span>أكمل معلومات ملفك الشخصي</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">3.</span>
                                    <span>تصفح خدماتنا وابدأ أول مشروع لك</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-semibold hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 group"
                        >
                            <span>الانتقال إلى لوحة التحكم | Go to Dashboard</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Auto Redirect Message */}
                        <p className="mt-6 text-sm text-slate-500">
                            سيتم التحويل تلقائياً خلال {countdown} ثواني...
                            <br />
                            <span className="text-xs">Auto-redirecting in {countdown} seconds...</span>
                        </p>
                    </div>

                    {/* Help Link */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-slate-400">
                            تحتاج إلى مساعدة؟{' '}
                            <a href="/support" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                                اتصل بالدعم | Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
