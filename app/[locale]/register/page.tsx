import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';
import { Shield, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'إنشاء حساب | NovaArab',
    description: 'إنشاء حساب جديد في NovaArab للوصول إلى خدمات البرمجة والذكاء الاصطناعي',
};

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

            {/* Content */}
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full">
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-600/50 mb-4">
                            <Shield className="w-8 h-8 text-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                            NovaArab
                        </h1>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mt-4">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-300 font-medium">انضم إلينا اليوم</span>
                        </div>
                    </div>

                    {/* Register Form */}
                    <RegisterForm />

                    {/* Footer Note */}
                    <p className="text-center text-sm text-muted-foreground mt-8">
                        بالتسجيل، أنت توافق على{' '}
                        <a href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                            شروط الاستخدام
                        </a>{' '}
                        و{' '}
                        <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
                            سياسة الخصوصية
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
