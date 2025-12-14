'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { registerWithEmail, validateEmail, validatePassword, createUserProfile } from '@/lib/firebase/auth';

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [name]: '' }));
        setErrorMessage('');
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors = { name: '', email: '', password: '' };
        let isValid = true;

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب | Name is required';
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'الاسم يجب أن يكون حرفين على الأقل | Minimum 2 characters';
            isValid = false;
        }

        // Validate email
        if (!formData.email) {
            newErrors.email = 'البريد الإلكتروني مطلوب | Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح | Invalid email format';
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'كلمة المرور مطلوبة | Password is required';
            isValid = false;
        } else {
            const passwordValidation = validatePassword(formData.password);
            if (!passwordValidation.isValid) {
                newErrors.password = passwordValidation.message || '';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage('');

        try {
            const result = await registerWithEmail(
                formData.name,
                formData.email,
                formData.password
            );

            if (result.success && result.user) {
                // Create user profile in Firestore
                await createUserProfile(result.user);

                setSuccess(true);
                // Redirect to verification page after 3 seconds
                setTimeout(() => {
                    router.push('/verify-email');
                }, 3000);
            } else {
                setErrorMessage(result.error || 'حدث خطأ أثناء التسجيل');
            }
        } catch (error) {
            setErrorMessage('حدث خطأ غير متوقع. حاول مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    // Success state
    if (success) {
        return (
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">تم إنشاء الحساب بنجاح!</h2>
                <p className="text-lg text-slate-600 mb-6">
                    تم إرسال رابط التحقق إلى بريدك الإلكتروني
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <p className="text-sm text-slate-700 leading-relaxed">
                        الرجاء التحقق من بريدك الإلكتروني <span className="font-semibold text-blue-600">{formData.email}</span> وانقر على الرابط لتفعيل حسابك.
                    </p>
                </div>
                <p className="text-sm text-slate-500 mt-6">جاري التحويل إلى صفحة التحقق...</p>
            </div>
        );
    }

    // Registration form
    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">إنشاء حساب جديد</h2>
                <p className="text-slate-600">Create a new account | أدخل بياناتك للتسجيل</p>
            </div>

            {errorMessage && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                        الاسم الكامل | Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`block w-full pr-10 pl-4 py-3 border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                                } rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/50`}
                            placeholder="أدخل اسمك الكامل"
                            disabled={loading}
                        />
                    </div>
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        البريد الإلكتروني | Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full pr-10 pl-4 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                                } rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/50`}
                            placeholder="example@domain.com"
                            disabled={loading}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                        كلمة المرور | Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`block w-full pr-10 pl-4 py-3 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                                } rounded-xl focus:outline-none focus:ring-2 transition-all bg-white/50`}
                            placeholder="••••••••"
                            disabled={loading}
                        />
                    </div>
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.password}
                        </p>
                    )}
                    <p className="mt-2 text-xs text-slate-500">
                        يجب أن تكون كلمة المرور 6 أحرف على الأقل | Minimum 6 characters
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>جاري إنشاء الحساب...</span>
                        </>
                    ) : (
                        <span>إنشاء الحساب | Create Account</span>
                    )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                        لديك حساب بالفعل؟{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            تسجيل الدخول | Log In
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}
