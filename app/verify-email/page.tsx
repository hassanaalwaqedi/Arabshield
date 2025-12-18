'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle, AlertCircle, RefreshCw, Loader2, Shield } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { resendVerificationEmail, checkEmailVerified } from '@/lib/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export default function VerifyEmailPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [resending, setResending] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        // Check auth state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (currentUser.emailVerified) {
                    // Already verified, redirect to dashboard
                    router.push('/dashboard');
                } else {
                    setUser(currentUser);
                }
            } else {
                // No user, redirect to login
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    // Cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    // Handle resend verification email
    const handleResend = async () => {
        if (cooldown > 0) return;

        setResending(true);
        setMessage('');
        setError('');

        const result = await resendVerificationEmail();

        if (result.success) {
            setMessage(result.message || 'تم إعادة إرسال رابط التحقق بنجاح');
            setCooldown(60); // 60 seconds cooldown
        } else {
            setError(result.error || 'فشل إعادة إرسال الرابط');
        }

        setResending(false);
    };

    // Check verification status
    const checkStatus = async () => {
        if (user) {
            await user.reload();
            if (user.emailVerified) {
                router.push('/dashboard');
            } else {
                setError('البريد الإلكتروني لم يتم تفعيله بعد');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

            {/* Content */}
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-2xl w-full">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-600/50 mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                            NovaArab
                        </h1>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
                        {/* Email Icon */}
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50 relative">
                            <Mail className="w-10 h-10 text-white" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-xs">!</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
                            تحقق من بريدك الإلكتروني
                        </h2>
                        <p className="text-lg text-slate-600 text-center mb-8">
                            Verify Your Email Address
                        </p>

                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                الخطوات التالية:
                            </h3>
                            <ol className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">1.</span>
                                    <span>افتح بريدك الإلكتروني: <span className="font-semibold">{user?.email}</span></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">2.</span>
                                    <span>ابحث عن رسالة من NovaArab (تحقق من البريد المزعج إذا لم تجدها)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">3.</span>
                                    <span>انقر على رابط التفعيل في الرسالة</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">4.</span>
                                    <span>عد إلى هذه الصفحة واضغط "تحقق من الحالة"</span>
                                </li>
                            </ol>
                        </div>

                        {/* Messages */}
                        {message && (
                            <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-green-700">{message}</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="space-y-4">
                            {/* Check Status Button */}
                            <button
                                onClick={checkStatus}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
                            >
                                <span>تحقق من الحالة | Check Status</span>
                            </button>

                            {/* Resend Button */}
                            <button
                                onClick={handleResend}
                                disabled={resending || cooldown > 0}
                                className="w-full bg-slate-100 border-2 border-slate-300 text-slate-700 py-4 px-6 rounded-xl font-semibold hover:bg-slate-200 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {resending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>جاري الإرسال...</span>
                                    </>
                                ) : cooldown > 0 ? (
                                    <span>إعادة الإرسال بعد {cooldown} ثانية</span>
                                ) : (
                                    <>
                                        <RefreshCw className="w-5 h-5" />
                                        <span>إعادة إرسال رابط التحقق | Resend Link</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                            <p className="text-sm text-slate-600 mb-2">
                                لم تستلم الرسالة؟ تأكد من صندوق البريد المزعج
                            </p>
                            <p className="text-sm text-slate-600">
                                Need help?{' '}
                                <a href="/support" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                    Contact Support
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
