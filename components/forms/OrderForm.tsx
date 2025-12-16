"use client";

import { useState } from 'react';
import { Send, CheckCircle, Globe, Smartphone, Shield, Brain, Briefcase, Clock, FileCheck, ChevronDown, Zap, Users, Lock, TrendingUp } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Service Card Component
interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    selected: boolean;
    onClick: () => void;
}

function ServiceCard({ icon: Icon, title, description, features, selected, onClick }: ServiceCardProps) {
    return (
        <div
            onClick={onClick}
            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selected
                ? 'border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/20'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50'
                }`}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${selected ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700 group-hover:bg-slate-600'
                }`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-4">{description}</p>
            <ul className="space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-slate-500 flex items-center">
                        <div className="w-1 h-1 rounded-full bg-slate-600 mr-2"></div>
                        {feature}
                    </li>
                ))}
            </ul>
            {selected && (
                <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
            )}
        </div>
    );
}

// FAQ Item Component
interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/30">
            <button
                onClick={onClick}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
            >
                <span className="font-semibold text-white">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}

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

// Select Component
interface SelectProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
}

function Select({ label, required = false, value, onChange, options, placeholder }: SelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
                {label} {required && <span className="text-blue-400">*</span>}
            </label>
            <div className="relative">
                <select
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="w-full h-12 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                    <option value="">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

function Button({ children, onClick, variant = "primary", className = "", isLoading = false, disabled = false }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white"
    };

    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`inline-flex items-center justify-center px-8 h-14 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جارٍ المعالجة...
                </>
            ) : children}
        </button>
    );
}

// Main Order Page Component
export default function OrderPage() {
    const [selectedService, setSelectedService] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        details: ''
    });

    const services = [
        {
            id: 'web',
            icon: Globe,
            title: 'تطوير المواقع',
            description: 'مواقع حديثة ومتجاوبة مبنية بأحدث التقنيات',
            features: ['تصميم مخصص', 'محسّن لمحركات البحث', 'أولوية الجوال', 'أداء سريع']
        },
        {
            id: 'app',
            icon: Smartphone,
            title: 'تطوير تطبيقات الجوال',
            description: 'تطبيقات جوال أصلية ومتعددة المنصات',
            features: ['iOS و Android', 'تكامل سحابي', 'ميزات الوقت الفعلي', 'بنية قابلة للتوسع']
        },
        {
            id: 'security',
            icon: Shield,
            title: 'حماية الأمن السيبراني',
            description: 'حلول أمنية ومراجعات على مستوى المؤسسات',
            features: ['كشف التهديدات', 'الامتثال', 'اختبار الاختراق', 'مراقبة 24/7']
        },
        {
            id: 'ai',
            icon: Brain,
            title: 'حلول الذكاء الاصطناعي',
            description: 'أتمتة ذكية وأنظمة تعلم آلي',
            features: ['نماذج ذكاء اصطناعي مخصصة', 'أتمتة', 'تحليل البيانات', 'رؤى تنبؤية']
        },
        {
            id: 'enterprise',
            icon: Briefcase,
            title: 'حلول المؤسسات',
            description: 'برمجيات مخصصة لاحتياجات الأعمال المعقدة',
            features: ['حلول مخصصة', 'تكامل', 'دعم', 'تدريب']
        }
    ];

    const faqs = [
        {
            question: 'ما هي الجدول الزمنية النموذجية للمشروع؟',
            answer: 'تختلف الجداول الزمنية للمشروع بناءً على التعقيد. تستغرق المواقع البسيطة 2-4 أسابيع، بينما يمكن أن تستغرق التطبيقات المعقدة 3-6 أشهر. نقدم جداول زمنية تفصيلية خلال استشارتنا الأولية.'
        },
        {
            question: 'كيف تعمل التسعير؟',
            answer: 'نقدم تسعيراً شفافاً قائماً على المشروع. بعد فهم متطلباتك، نقدم عرضاً تفصيلياً مع المعالم وشروط الدفع. تتراوح المشاريع النموذجية من 3,000 دولار إلى 100,000 دولار+ حسب النطاق.'
        },
        {
            question: 'هل تقدمون دعماً مستمراً؟',
            answer: 'نعم! نقدم حزم صيانة شاملة تشمل التحديثات وتصحيحات الأمان وتحسين الأداء والدعم الفني 24/7 للأنظمة الحرجة.'
        },
        {
            question: 'ما هي إجراءات الأمان التي تطبقونها؟',
            answer: 'نتبع أفضل ممارسات الصناعة بما في ذلك التشفير والمصادقة الآمنة والمراجعات الأمنية المنتظمة والامتثال لـ GDPR/SOC2 والمراقبة المستمرة للتهديدات.'
        },
        {
            question: 'هل يمكنكم التكامل مع أنظمتنا الحالية؟',
            answer: 'بالتأكيد. نتخصص في التكامل السلس مع المنصات الشعبية وواجهات برمجة التطبيقات والأنظمة القديمة. يضمن فريقنا الترحيل السلس للبيانات وتوافق الأنظمة.'
        }
    ];

    const handleServiceSelect = (serviceId: string) => {
        setSelectedService(serviceId);
        setFormData({ ...formData, service: serviceId });
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || !formData.service || !formData.budget || !formData.details) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Save to Firestore
            await addDoc(collection(db, 'orders'), {
                fullName: formData.fullName,
                email: formData.email,
                company: formData.company || null,
                service: formData.service,
                budget: formData.budget,
                details: formData.details,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting order:', err);
            setError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setSelectedService('');
        setFormData({
            fullName: '',
            email: '',
            company: '',
            service: '',
            budget: '',
            details: ''
        });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 shadow-2xl">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            تم استلام الطلب بنجاح
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                            شكراً لاختيارك ArabShield. سيقوم فريق المؤسسات لدينا بمراجعة متطلباتك والاتصال بك خلال 24 ساعة مع عرض تفصيلي.
                        </p>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>رد في 24 ساعة</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <FileCheck className="w-4 h-4" />
                                <span>عرض تفصيلي</span>
                            </div>
                        </div>
                        <Button onClick={handleReset} variant="secondary" className="mx-auto">
                            إرسال طلب آخر
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">حلول المؤسسات</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        طلب خدمة
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        حوّل عملك بحلول تقنية متطورة. من تطوير الويب إلى الأتمتة المدعومة بالذكاء الاصطناعي، نقدم أنظمة على مستوى المؤسسات قابلة للتوسع.
                    </p>
                </div>
            </div>

            {/* Service Selection */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">اختر خدمتك</h2>
                    <p className="text-slate-400 text-lg">اختر الخدمة التي تناسب احتياجاتك بشكل أفضل</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            {...service}
                            selected={selectedService === service.id}
                            onClick={() => handleServiceSelect(service.id)}
                        />
                    ))}
                </div>

                {/* Order Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <FileCheck className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">تفاصيل المشروع</h3>
                                <p className="text-slate-400 text-sm">أخبرنا عن متطلباتك</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="الاسم الكامل"
                                    required
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                <Input
                                    label="عنوان البريد الإلكتروني"
                                    type="email"
                                    required
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <Input
                                label="اسم الشركة"
                                placeholder="شركتك (اختياري)"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />

                            <Select
                                label="نوع الخدمة"
                                required
                                placeholder="اختر خدمة"
                                value={formData.service}
                                onChange={(e) => {
                                    setFormData({ ...formData, service: e.target.value });
                                    setSelectedService(e.target.value);
                                }}
                                options={services.map(s => ({ value: s.id, label: s.title }))}
                            />

                            <Select
                                label="الميزانية التقديرية"
                                required
                                placeholder="اختر نطاق الميزانية"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                options={[
                                    { value: 'small', label: '$3,000 - $10,000' },
                                    { value: 'medium', label: '$10,000 - $50,000' },
                                    { value: 'large', label: '$50,000 - $100,000' },
                                    { value: 'enterprise', label: '$100,000+' }
                                ]}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                    وصف المشروع <span className="text-blue-400">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="اشرح أهداف مشروعك والميزات الرئيسية وتوقعات الجدول الزمني وأي متطلبات محددة..."
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
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
                                className="w-full text-lg"
                                isLoading={loading}
                            >
                                إرسال الطلب <Send className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">موثوق به من فرق حول العالم</h2>
                        <p className="text-slate-400">نقدم التميّز عبر الصناعات</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {[
                            { icon: Users, label: '500+ عميل', desc: 'شركات مخدومة' },
                            { icon: TrendingUp, label: 'نجاح 98%', desc: 'إنجاز المشاريع' },
                            { icon: Lock, label: 'معتمد SOC 2', desc: 'معايير الأمان' },
                            { icon: Clock, label: 'دعم 24/7', desc: 'متاح دائماً' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-1">{stat.label}</div>
                                <div className="text-sm text-slate-500">{stat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">الأسئلة المتكررة</h2>
                        <p className="text-slate-400 text-lg">كل ما تحتاج لمعرفته</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <FAQItem
                                key={idx}
                                {...faq}
                                isOpen={openFAQ === idx}
                                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            انضم إلى مئات الشركات التي تثق بنا في مشاريعها التقنية الأكثر أهمية.
                        </p>
                        <Button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            variant="primary"
                            className="text-lg"
                        >
                            أرسل طلبك
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}