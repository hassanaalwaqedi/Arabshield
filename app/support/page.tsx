"use client";

import { useState, useEffect } from 'react';
import { Mail, MessageCircle, FileQuestion, LifeBuoy, Clock, CheckCircle, Zap, Shield, ArrowRight, Search, Book, Video, HelpCircle, Phone, Headphones, ChevronDown } from 'lucide-react';

// Animated Background Particles
function FloatingIcons() {
    const icons = [FileQuestion, MessageCircle, LifeBuoy, HelpCircle, Shield, CheckCircle];
    const [particles, setParticles] = useState<Array<{
        id: number;
        Icon: React.ElementType;
        x: number;
        y: number;
        duration: number;
        delay: number;
        scale: number;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            Icon: icons[Math.floor(Math.random() * icons.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 20 + Math.random() * 15,
            delay: Math.random() * 5,
            scale: 0.5 + Math.random() * 0.5
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute text-blue-400"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animation: `float-support ${particle.duration}s linear infinite`,
                        animationDelay: `${particle.delay}s`,
                        transform: `scale(${particle.scale})`
                    }}
                >
                    <particle.Icon className="w-8 h-8" />
                </div>
            ))}
            <style>{`
        @keyframes float-support {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          50% { transform: translate(30px, -100px) rotate(180deg); opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translate(60px, -200px) rotate(360deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

// Support Card Component
interface SupportCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    buttonText: string;
    buttonVariant?: "primary" | "secondary" | "outline";
    badge?: string;
    onClick?: () => void;
}

function SupportCard({ icon: Icon, title, description, buttonText, buttonVariant = "primary", badge, onClick }: SupportCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 text-center transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
            style={{
                transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'none'
            }}
        >
            {badge && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {badge}
                </div>
            )}

            {/* Icon with animation */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon className="w-10 h-10 text-blue-400 transition-all duration-500 group-hover:scale-110" />
                {isHovered && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-ping"></div>
                )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 mb-8 leading-relaxed min-h-[48px]">{description}</p>

            <button
                onClick={onClick}
                className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn ${buttonVariant === 'primary'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30'
                    : buttonVariant === 'secondary'
                        ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                        : 'bg-transparent border-2 border-slate-700 text-white hover:border-blue-500'
                    }`}
            >
                {buttonText}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
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
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/50">
            <button
                onClick={onClick}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
            >
                <span className="font-semibold text-white pr-4">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}

// Resource Card Component
interface ResourceCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    count: number;
}

function ResourceCard({ icon: Icon, title, description, count }: ResourceCardProps) {
    return (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-slate-400 text-sm mb-2">{description}</p>
                    <span className="text-xs text-slate-500">{count} مقالة</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
        </div>
    );
}

// Stat Card Component
interface StatCardProps {
    icon: React.ElementType;
    value: string;
    label: string;
}

function StatCard({ icon: Icon, value, label }: StatCardProps) {
    return (
        <div className="text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-slate-400">{label}</div>
        </div>
    );
}

// Main Support Page Component
export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const supportOptions: Array<{
        icon: React.ElementType;
        title: string;
        description: string;
        buttonText: string;
        buttonVariant: "primary" | "secondary" | "outline";
        badge?: string;
    }> = [
            {
                icon: MessageCircle,
                title: 'دردشة مباشرة',
                description: 'تحدث مع فريق الدعم لدينا في الوقت الفعلي للحصول على مساعدة سريعة وإجابات فورية.',
                buttonText: 'ابدأ الدردشة',
                buttonVariant: 'primary',
                badge: 'الأسرع'
            },
            {
                icon: FileQuestion,
                title: 'قاعدة المعرفة',
                description: 'ابحث عن إجابات فورية للأسئلة الشائعة حول خدماتنا وعملياتنا.',
                buttonText: 'تصفح المقالات',
                buttonVariant: 'secondary'
            },
            {
                icon: LifeBuoy,
                title: 'إرسال تذكرة',
                description: 'للمشاكل التقنية المعقدة أو الاستفسارات الخاصة بالمشروع التي تحتاج إلى اهتمام مفصل.',
                buttonText: 'اتصل بالدعم',
                buttonVariant: 'outline'
            }
        ];

    const resources = [
        { icon: Book, title: 'التوثيق', description: 'أدلة تقنية ومراجع API', count: 150 },
        { icon: Video, title: 'دروس الفيديو', description: 'شروحات فيديو خطوة بخطوة', count: 45 },
        { icon: HelpCircle, title: 'المشاكل الشائعة', description: 'حلول للمشاكل المبلغ عنها بشكل متكرر', count: 80 }
    ];

    const faqs = [
        {
            question: 'ما هي ساعات الدعم الخاصة بكم؟',
            answer: 'فريق الدعم لدينا متاح 24/7 للمشاكل الحرجة. للاستفسارات العامة، ساعات الدعم العادية لدينا هي من الأحد إلى الخميس، من 9 صباحاً إلى 6 مساءً (GST). عملاء الدعم الممتاز يحصلون على مساعدة ذات أولوية في أي وقت.'
        },
        {
            question: 'كم بسرعة سأتلقى رداً؟',
            answer: 'ردود الدردشة المباشرة عادة ما تكون فورية. تتلقى تذاكر الدعم عبر البريد الإلكتروني ردوداً في غضون 4-6 ساعات خلال أيام العمل. يتم معالجة المشاكل الحرجة التي يتم تمييزها من قبل عملاء المؤسسات في غضون ساعة واحدة.'
        },
        {
            question: 'هل تقدمون دعماً هاتفياً؟',
            answer: 'نعم، الدعم الهاتفي متاح لعملاء الخطة الممتازة والمؤسسات. اتصل بمدير حسابك للحصول على وصول هاتفي مباشر. يمكن لمستخدمي الخطة العادية جدولة استشارات هاتفية من خلال بوابة الدعم لدينا.'
        },
        {
            question: 'هل يمكنكم المساعدة في طلبات التطوير المخصصة؟',
            answer: 'بالتأكيد! يمكن لفريق الدعم لدينا المساعدة في طلبات الميزات والتكاملات المخصصة والتنفيذات التقنية. قد يتم تسعير أعمال التطوير المعقدة بشكل منفصل بناءً على نطاق العمل والمتطلبات.'
        },
        {
            question: 'ماذا لو كنت بحاجة إلى دعم طارئ؟',
            answer: 'للمشاكل العاجلة التي تؤثر على أنظمة الإنتاج، استخدم عملية التصعيد ذات الأولوية لدينا. يتمتع عملاء المؤسسات بإمكانية الوصول إلى خطوط طوارئ مخصصة مع أوقات استجابة مضمونة بموجب اتفاقية مستوى الخدمة (SLA) الخاصة بنا.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>
                <FloatingIcons />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
                        <Headphones className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300 font-medium">دعم متاح 24/7</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        مركز الدعم
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                        نحن ملتزمون بنجاحك. الوصول إلى مواردنا أو التواصل مع فريقنا من الخبراء للحصول على مساعدة شخصية.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="ابحث عن مقالات المساعدة أو الأدلة أو المشاكل الشائعة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <StatCard icon={Clock} value="< 1 ساعة" label="متوسط وقت الاستجابة" />
                    <StatCard icon={CheckCircle} value="98%" label="معدل الحل" />
                    <StatCard icon={Zap} value="24/7" label="التوفر" />
                    <StatCard icon={Shield} value="SOC 2" label="دعم معتمد" />
                </div>

                {/* Support Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {supportOptions.map((option, idx) => (
                        <SupportCard key={idx} {...option} onClick={() => alert(`${option.title} clicked (Demo)`)} />
                    ))}
                </div>

                {/* Resources Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">موارد الخدمة الذاتية</h2>
                        <p className="text-slate-400 text-lg">ابحث عن إجابات في وقتك الخاص</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {resources.map((resource, idx) => (
                            <ResourceCard key={idx} {...resource} />
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">الأسئلة الشائعة</h2>
                        <p className="text-slate-400 text-lg">إجابات سريعة للأسئلة الشائعة</p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
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

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-3">لا تزال بحاجة إلى مساعدة؟</h2>
                            <p className="text-slate-400 text-lg">فريق الدعم المتخصص لدينا جاهز لمساعدتك.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <span className="font-bold text-white block">support@arabshield.com</span>
                                    <span className="text-sm text-slate-400">ردود في غضون 24 ساعة</span>
                                </div>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <span className="font-bold text-white block">+966 5X XXX XXXX</span>
                                    <span className="text-sm text-slate-400">الإثنين-الجمعة، 9 ص-6 م</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}