"use client";

import { Check, Zap, Star, Sparkles, ArrowRight, Shield, Rocket, Building2 } from 'lucide-react';

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

function Button({ children, onClick, variant = "primary", className = "" }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
        secondary: "bg-white hover:bg-slate-50 text-slate-900 shadow-lg",
        outline: "bg-transparent border-2 border-slate-700 hover:border-slate-600 text-white"
    };

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center justify-center w-full px-8 h-12 rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

// Pricing Card Component
interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    recommended?: boolean;
    icon: React.ElementType;
}

function PricingCard({ title, price, description, features, popular, recommended, icon: Icon }: PricingCardProps) {
    return (
        <div className={`relative rounded-3xl transition-all duration-300 h-full flex flex-col ${popular
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl shadow-blue-600/30 scale-105 border-2 border-blue-400'
            : 'bg-slate-900 border-2 border-slate-800 hover:border-slate-700 shadow-xl'
            }`}>
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        الأكثر شعبية
                    </div>
                </div>
            )}

            {/* Recommended Badge */}
            {recommended && !popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        موصى به
                    </div>
                </div>
            )}

            <div className="p-8 flex flex-col h-full">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${popular
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-blue-500/10 border border-blue-500/20'
                    }`}>
                    <Icon className={`w-7 h-7 ${popular ? 'text-white' : 'text-blue-400'}`} />
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-white' : 'text-white'}`}>
                        {title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${popular ? 'text-blue-100' : 'text-slate-400'}`}>
                        {description}
                    </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                        {price === 'Custom' ? (
                            <span className={`text-4xl font-bold ${popular ? 'text-white' : 'text-white'}`}>
                                مخصص
                            </span>
                        ) : (
                            <>
                                <span className={`text-5xl font-bold ${popular ? 'text-white' : 'text-white'}`}>
                                    {price}
                                </span>
                                <span className={`text-lg ${popular ? 'text-blue-200' : 'text-slate-500'}`}>
                                    /مشروع
                                </span>
                            </>
                        )}
                    </div>
                    {price === 'Custom' && (
                        <p className={`text-sm mt-2 ${popular ? 'text-blue-200' : 'text-slate-500'}`}>
                            مخصص وفق احتياجاتك
                        </p>
                    )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <div className={`mt-0.5 rounded-full p-1 flex-shrink-0 ${popular
                                ? 'bg-white/20'
                                : 'bg-blue-500/10'
                                }`}>
                                <Check className={`w-4 h-4 ${popular ? 'text-white' : 'text-blue-400'}`} />
                            </div>
                            <span className={`text-sm leading-relaxed ${popular ? 'text-blue-50' : 'text-slate-300'}`}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Button
                    variant={popular ? 'secondary' : 'outline'}
                    className="group"
                >
                    اختر الخطة
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}

// Pricing Page Component
export default function PricingPage() {
    const plans = [
        {
            title: 'المبتدئين',
            price: '$3K-10K',
            description: 'مثالي للشركات الصغيرة والناشئة التي تتطلع لإنشاء تواجدها الرقمي.',
            icon: Rocket,
            features: [
                'موقع مخصص أو صفحة هبوط',
                'تصميم متجاوب للجوال',
                'تحسين SEO أساسي',
                'تكامل نموذج التواصل',
                '30 يوم دعم',
                'تسليم سريع (2-4 أسابيع)',
                'كود المصدر مشمول',
                'جولة مراجعة واحدة'
            ]
        },
        {
            title: 'المحترفين',
            price: '$10K-50K',
            description: 'مثالي للشركات النامية التي تحتاج إلى ميزات متقدمة وقابلية للتوسع.',
            icon: Zap,
            popular: true,
            features: [
                'كل ما في المبتدئين',
                'تطبيق ويب متقدم',
                'خلفية ومنطق أعمال مخصص',
                'تكامل قاعدة البيانات',
                'مصادقة المستخدمين',
                '90 يوم دعم',
                'تحسين الأداء',
                'أفضل ممارسات الأمان',
                'تحليلات ومراقبة',
                '3 جولات مراجعة'
            ]
        },
        {
            title: 'المؤسسات',
            price: 'Custom',
            description: 'حلول شاملة للمنظمات الكبيرة ذات المتطلبات المعقدة.',
            icon: Building2,
            recommended: true,
            features: [
                'كل ما في المحترفين',
                'تكامل الذكاء الاصطناعي والتعلم الآلي',
                'مراجعة وحماية الأمن السيبراني',
                'بنية الخدمات المصغرة',
                'إعداد البنية التحتية السحابية',
                'مدير مشروع مخصص',
                'سنة واحدة من الدعم الممتاز',
                'تدريب وتوثيق',
                'دعم ذو أولوية 24/7',
                'مراجعات غير محدودة',
                'ضمانات SLA'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">تسعير شفاف</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        اختر خطتك
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        حزم تسعير مرنة مصممة لتتناسب مع نطاق مشروعك وأهداف عملك. لا رسوم خفية، فقط قيمة شفافة.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
                    {plans.map((plan, idx) => (
                        <PricingCard key={idx} {...plan} />
                    ))}
                </div>
            </div>

            {/* Comparison Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">جميع الخطط تشمل</h2>
                        <p className="text-slate-400 text-lg">ميزات أساسية في كل حزمة</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Check, title: 'كود نظيف', desc: 'كود جاهز للإنتاج وقابل للصيانة' },
                            { icon: Shield, title: 'آمن', desc: 'ممارسات أمان معيارية في الصناعة' },
                            { icon: Zap, title: 'سريع', desc: 'محسّن للأداء' },
                            { icon: Star, title: 'دعم', desc: 'دعم فني مخصص' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">الأسئلة الشائعة عن الأسعار</h2>
                        <p className="text-slate-400 text-lg">أسئلة شائعة حول الأسعار</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'هل يمكنني الترقية إلى خطة أخرى لاحقاً؟',
                                a: 'بالتأكيد! يمكنك البدء بأي خطة والترقية مع نمو احتياجاتك. نجعل الانتقال سلساً.'
                            },
                            {
                                q: 'ما هي طرق الدفع التي تقبلونها؟',
                                a: 'نقبل جميع بطاقات الائتمان الرئيسية والتحويلات البنكية ويمكننا استيعاب شروط دفع مخصصة لعملاء المؤسسات.'
                            },
                            {
                                q: 'هل هناك ضمان لاسترجاع الأموال؟',
                                a: 'نعم، نقدم ضمان الرضا. إذا لم تكن راضياً عن التسليمات الأولية، سنعمل معك حتى تكون راضياً.'
                            },
                            {
                                q: 'هل تقدمون حزم مخصصة؟',
                                a: 'نعم! خطة المؤسسات قابلة للتخصيص بالكامل. اتصل بنا لمناقشة متطلباتك المحددة والحصول على عرض أسعار مخصص.'
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            اختر خطة تناسب احتياجاتك أو اتصل بنا لحل مؤسسي مخصص.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" className="text-lg">
                                ابدأ مشروعك
                            </Button>
                            <Button variant="outline" className="text-lg">
                                تحدث إلى المبيعات
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}