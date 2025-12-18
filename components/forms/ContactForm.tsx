"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle, Mail, MessageSquare, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Input Component
interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

function Input({ label, type = "text", placeholder, required = false, value, onChange, className = "" }: InputProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
                {label} {required && <span className="text-blue-400">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full h-12 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${className}`}
            />
        </div>
    );
}

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
}

function Button({ children, onClick, type = "button", variant = "primary", className = "", isLoading = false }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`inline-flex items-center justify-center px-8 h-14 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جارٍ الإرسال...
                </>
            ) : children}
        </button>
    );
}

// Contact Info Card Component
interface ContactInfoCardProps {
    icon: React.ElementType;
    title: string;
    info: string;
    subInfo?: string;
}

function ContactInfoCard({ icon: Icon, title, info, subInfo }: ContactInfoCardProps) {
    return (
        <div className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-1">{info}</p>
            {subInfo && <p className="text-slate-500 text-xs">{subInfo}</p>}
        </div>
    );
}

// Contact Form Component
function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Save to Firestore
            await addDoc(collection(db, 'contact_messages'), {
                name: formData.name,
                email: formData.email,
                subject: formData.subject || null,
                message: formData.message,
                status: 'unread',
                createdAt: serverTimestamp(),
            });

            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting contact form:', err);
            setError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setError(null);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    if (submitted) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">تم إرسال الرسالة بنجاح!</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        شكراً لتواصلك معنا. سيقوم فريقنا بمراجعة رسالتك والرد عليك خلال 24 ساعة.
                    </p>
                    <Button onClick={handleReset} variant="secondary">
                        إرسال رسالة أخرى
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Input
                label="اسمك"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
                label="عنوان البريد الإلكتروني"
                type="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
                label="الموضوع"
                placeholder="كيف يمكننا المساعدة؟"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    الرسالة <span className="text-blue-400">*</span>
                </label>
                <textarea
                    required
                    rows={6}
                    placeholder="أخبرنا عن استفسارك أو مشروعك أو كيف يمكننا مساعدتك..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full"
                isLoading={loading}
            >
                إرسال الرسالة <Send className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );
}

// Main Contact Page Component
export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">تواصل معنا</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        اتصل بنا
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        لديك سؤال أو مستعد لبدء مشروعك؟ نحن هنا لمساعدتك في تحقيق رؤيتك.
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">لنتحدث</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                سواء كنت تتطلع لبناء منتج جديد أو تحسين أنظمتك الحالية أو تحتاج إلى استشارة متخصصة، نحن مستعدون لمساعدتك على النجاح.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ContactInfoCard
                                icon={Mail}
                                title="راسلنا بريدياً"
                                info="hello@NovaArab.com"
                                subInfo="رد خلال 24 ساعة"
                            />
                            <ContactInfoCard
                                icon={Phone}
                                title="اتصل بنا"
                                info="+90 537 280 71 33"
                                subInfo="الأحد-الخميس، 9ص-6م"
                            />
                            <ContactInfoCard
                                icon={MapPin}
                                title="زرنا"
                                info="الرياض، المملكة العربية السعودية"
                                subInfo="حي التقنية، شارع الابتكار"
                            />
                            <ContactInfoCard
                                icon={Clock}
                                title="ساعات العمل"
                                info="الأحد-الخميس: 9ص-6م"
                                subInfo="الجمعة-السبت: مغلق"
                            />
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-4">لماذا تختار NovaArab؟</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>أمن وامتثال على مستوى المؤسسات</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>دعم مخصص 24/7 للأنظمة الحرجة</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>سجل حافل مثبت بأكثر من 100 مشروع ناجح</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>تكنولوجيا متطورة وأفضل الممارسات</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <Send className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">أرسل لنا رسالة</h3>
                                <p className="text-slate-400 text-sm">سنرد في أقرب وقت ممكن</p>
                            </div>
                        </div>

                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">موقعنا</h2>
                        <p className="text-slate-400">الرياض، المملكة العربية السعودية</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7392665913313!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1702743000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="NovaArab Location"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت مستعد لبدء مشروعك؟</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        دعنا نناقش كيف يمكننا مساعدتك في تحويل أعمالك بالتكنولوجيا.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/order"
                            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/30 transition-all"
                        >
                            ابدأ مشروعك
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-semibold text-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
                        >
                            عرض أعمالنا
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}