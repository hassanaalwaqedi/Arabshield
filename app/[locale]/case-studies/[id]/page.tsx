"use client";

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Cpu,
    Globe,
    ShoppingCart,
    BarChart3,
    ShieldCheck,
    ArrowRight,
    Zap,
    ChevronLeft,
    Target,
    Lightbulb,
    CheckCircle2,
    Users,
    TrendingUp,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

// Mock Data for Case Studies with extended content
const caseStudies = [
    {
        id: 1,
        title: "منصة التجارة الإلكترونية الذكية",
        description: "تطوير منصة تجارة إلكترونية متكاملة تدعم الذكاء الاصطناعي لتقديم توصيات مخصصة وتجربة مستخدم سلسة، مما أدى لزيادة المبيعات بنسبة 40%.",
        category: "تطوير ويب",
        tech: ["Next.js", "Node.js", "AI Models", "Stripe"],
        icon: ShoppingCart,
        gradient: "from-blue-500 to-cyan-500",
        client: "شركة تجارية كبرى",
        duration: "4 أشهر",
        year: "2024",
        challenge: "كانت الشركة تعاني من انخفاض معدلات التحويل وتجربة مستخدم غير محسنة في منصتهم القديمة. احتاجوا لمنصة حديثة تستخدم الذكاء الاصطناعي لتخصيص التجربة.",
        solution: "قمنا بتطوير منصة جديدة كلياً باستخدام Next.js مع نظام توصيات ذكي يعتمد على سلوك المستخدم وتاريخ الشراء. تم دمج نظام دفع آمن مع Stripe ولوحة تحكم متقدمة.",
        results: [
            { label: "زيادة المبيعات", value: "40%", icon: TrendingUp },
            { label: "تحسين معدل التحويل", value: "65%", icon: Target },
            { label: "رضا العملاء", value: "95%", icon: Users },
            { label: "سرعة التحميل", value: "2.1s", icon: Clock }
        ],
        features: [
            "نظام توصيات ذكي بالذكاء الاصطناعي",
            "واجهة مستخدم متجاوبة وسريعة",
            "نظام إدارة مخزون متكامل",
            "تقارير وتحليلات متقدمة",
            "دعم متعدد اللغات والعملات"
        ]
    },
    {
        id: 2,
        title: "نظام إدارة الموارد المؤسسية (ERP)",
        description: "حل سحابي شامل لإدارة العمليات الداخلية للشركات الكبرى، يربط بين الموارد البشرية، المبيعات، والمحاسبة في لوحة تحكم موحدة.",
        category: "أنظمة مؤسسية",
        tech: ["React", "Python Django", "PostgreSQL", "Docker"],
        icon: BarChart3,
        gradient: "from-purple-500 to-pink-500",
        client: "مجموعة صناعية",
        duration: "8 أشهر",
        year: "2024",
        challenge: "الشركة كانت تستخدم أنظمة منفصلة لكل قسم مما أدى لعدم تكامل البيانات وصعوبة اتخاذ القرارات.",
        solution: "بنينا نظام ERP سحابي موحد يربط جميع الأقسام مع لوحة تحكم ذكية توفر رؤى فورية.",
        results: [
            { label: "تقليل وقت العمليات", value: "50%", icon: Clock },
            { label: "زيادة الإنتاجية", value: "35%", icon: TrendingUp },
            { label: "دقة البيانات", value: "99%", icon: Target },
            { label: "توفير التكاليف", value: "30%", icon: Zap }
        ],
        features: [
            "إدارة موارد بشرية شاملة",
            "نظام محاسبة ومالية متكامل",
            "إدارة المخزون والمستودعات",
            "تقارير تحليلية في الوقت الفعلي",
            "تكامل مع أنظمة خارجية"
        ]
    },
    {
        id: 3,
        title: "تطبيق الخدمات اللوجستية وتتبع الشحنات",
        description: "تطبيق ذكي يتيح تتبع الشحنات في الوقت الفعلي باستخدام تقنيات الموقع الجغرافي، مع خوارزميات لتحسين مسارات التوصيل.",
        category: "تطبيقات جوال",
        tech: ["Flutter", "Firebase", "Google Maps API", "Redis"],
        icon: Globe,
        gradient: "from-orange-500 to-yellow-500",
        client: "شركة لوجستية",
        duration: "5 أشهر",
        year: "2023",
        challenge: "صعوبة تتبع الشحنات وعدم كفاءة مسارات التوصيل مما أدى لتأخيرات وزيادة التكاليف.",
        solution: "طورنا تطبيق موبايل متكامل مع خوارزميات ذكية لتحسين المسارات وتتبع GPS في الوقت الفعلي.",
        results: [
            { label: "تقليل وقت التوصيل", value: "25%", icon: Clock },
            { label: "توفير الوقود", value: "20%", icon: TrendingUp },
            { label: "رضا العملاء", value: "92%", icon: Users },
            { label: "دقة التتبع", value: "99%", icon: Target }
        ],
        features: [
            "تتبع GPS في الوقت الفعلي",
            "خوارزمية تحسين المسارات",
            "إشعارات فورية للعملاء",
            "تقارير أداء السائقين",
            "تكامل مع نظام الفوترة"
        ]
    },
    {
        id: 4,
        title: "بوابة التعليم الرقمي التفاعلي",
        description: "منصة تعليمية تدعم الفصول الافتراضية المباشرة والمحتوى التفاعلي، مصممة لاستيعاب أكثر من 100 ألف طالب متزامن.",
        category: "تكنولوجيا التعليم",
        tech: ["Vue.js", "WebRTC", "AWS MediaLive", "Go"],
        icon: Cpu,
        gradient: "from-emerald-500 to-teal-500",
        client: "جامعة كبرى",
        duration: "6 أشهر",
        year: "2023",
        challenge: "الحاجة لمنصة تعليمية تستوعب أعداد كبيرة من الطلاب مع ضمان جودة البث والتفاعلية.",
        solution: "بنينا منصة قابلة للتوسع باستخدام AWS مع دعم للفصول الافتراضية المباشرة والمحتوى التفاعلي.",
        results: [
            { label: "طالب متزامن", value: "100K+", icon: Users },
            { label: "وقت التشغيل", value: "99.9%", icon: Target },
            { label: "تفاعل الطلاب", value: "85%", icon: TrendingUp },
            { label: "جودة البث", value: "HD", icon: Zap }
        ],
        features: [
            "فصول افتراضية مباشرة",
            "محتوى تفاعلي وألعاب تعليمية",
            "نظام اختبارات وتقييم",
            "لوحة تحكم للمعلمين",
            "تحليلات أداء الطلاب"
        ]
    },
    {
        id: 5,
        title: "نظام الحماية السيبرانية المصرفي",
        description: "تطوير طبقة حماية متقدمة للبنية التحتية البنكية، تعتمد على تعلم الآلة للكشف عن التهديدات والهجمات السيبرانية بشكل استباقي.",
        category: "الأمن السيبراني",
        tech: ["Rust", "TensorFlow", "Kafka", "K8s"],
        icon: ShieldCheck,
        gradient: "from-red-500 to-rose-600",
        client: "بنك إقليمي",
        duration: "10 أشهر",
        year: "2024",
        challenge: "تزايد الهجمات السيبرانية على القطاع المصرفي مع الحاجة لنظام استباقي للكشف عن التهديدات.",
        solution: "طورنا نظام حماية يعتمد على تعلم الآلة لتحليل السلوك والكشف المبكر عن التهديدات.",
        results: [
            { label: "الكشف عن التهديدات", value: "99.8%", icon: Target },
            { label: "تقليل الاختراقات", value: "100%", icon: ShieldCheck },
            { label: "سرعة الاستجابة", value: "50ms", icon: Clock },
            { label: "توفير التكاليف", value: "60%", icon: TrendingUp }
        ],
        features: [
            "كشف التهديدات بالذكاء الاصطناعي",
            "مراقبة 24/7 في الوقت الفعلي",
            "استجابة آلية للحوادث",
            "تقارير امتثال تلقائية",
            "تشفير متقدم للبيانات"
        ]
    },
    {
        id: 6,
        title: "منصة التحليل المالي بالذكاء الاصطناعي",
        description: "أداة متقدمة للمحللين الماليين تتيح معالجة البيانات الضخمة واستخراج التوقعات السوقية بدقة عالية وبسرعة فائقة.",
        category: "الذكاء الاصطناعي",
        tech: ["Python", "Pandas", "FastAPI", "React"],
        icon: Zap,
        gradient: "from-indigo-500 to-violet-500",
        client: "شركة استثمارية",
        duration: "7 أشهر",
        year: "2024",
        challenge: "الحاجة لتحليل كميات ضخمة من البيانات المالية بسرعة لاتخاذ قرارات استثمارية دقيقة.",
        solution: "بنينا منصة تحليل تستخدم نماذج تعلم آلي لتحليل البيانات واستخراج توقعات السوق.",
        results: [
            { label: "دقة التوقعات", value: "87%", icon: Target },
            { label: "سرعة التحليل", value: "10x", icon: Zap },
            { label: "بيانات محللة يومياً", value: "5TB", icon: TrendingUp },
            { label: "عائد الاستثمار", value: "300%", icon: Users }
        ],
        features: [
            "تحليل البيانات الضخمة",
            "نماذج توقع بالذكاء الاصطناعي",
            "لوحات تحكم تفاعلية",
            "تنبيهات ذكية",
            "تكامل مع مصادر البيانات"
        ]
    }
];

export default function CaseStudyDetailPage() {
    const params = useParams();
    const id = params.id as string;

    // Find case study by id
    const study = caseStudies.find(s => s.id.toString() === id);

    if (!study) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">دراسة الحالة غير موجودة</h1>
                    <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على دراسة الحالة المطلوبة.</p>
                    <Link href="/case-studies">
                        <Button variant="glow">
                            <ArrowRight className="w-4 h-4 ml-2" />
                            العودة لدراسات الحالة
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = study.icon;

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">
            {/* Hero Section */}
            <div className={`relative pt-24 pb-16 bg-gradient-to-br ${study.gradient}`}>
                <div className="absolute inset-0 bg-background/70" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Back Button */}
                        <Link href="/case-studies" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                            العودة لدراسات الحالة
                        </Link>

                        <div className="flex items-start gap-6 mb-6">
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${study.gradient} p-0.5 flex-shrink-0`}>
                                <div className="w-full h-full bg-background/80 rounded-2xl flex items-center justify-center">
                                    <Icon className="w-10 h-10 text-foreground" />
                                </div>
                            </div>
                            <div>
                                <Badge className="mb-3 bg-white/20 backdrop-blur border-white/30 text-foreground">
                                    {study.category}
                                </Badge>
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                    {study.title}
                                </h1>
                            </div>
                        </div>

                        <p className="text-lg text-foreground/80 mb-8 max-w-3xl">
                            {study.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 text-sm text-foreground/70">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>العميل: {study.client}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>المدة: {study.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span>السنة: {study.year}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Results Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                        النتائج المحققة
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {study.results.map((result, index) => {
                            const ResultIcon = result.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                    className="bg-card/50 border border-border rounded-2xl p-6 text-center hover:border-border transition-colors"
                                >
                                    <ResultIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-foreground mb-2">{result.value}</div>
                                    <div className="text-sm text-muted-foreground">{result.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-card/50 border border-border rounded-2xl p-8"
                    >
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <Target className="w-5 h-5 text-orange-500" />
                            التحدي
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            {study.challenge}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="bg-card/50 border border-border rounded-2xl p-8"
                    >
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            الحل
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            {study.solution}
                        </p>
                    </motion.div>
                </div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        الميزات الرئيسية
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {study.features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-card/30 border border-border/50 rounded-xl p-4"
                            >
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-slate-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold mb-8">التقنيات المستخدمة</h2>
                    <div className="flex flex-wrap gap-3">
                        {study.tech.map((tech, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="px-4 py-2 text-sm bg-card/50"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className={`bg-gradient-to-br ${study.gradient} rounded-3xl p-8 md:p-12 text-center`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        هل لديك مشروع مماثل؟
                    </h2>
                    <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
                        نحن مستعدون لمساعدتك في تحويل فكرتك إلى واقع. تواصل معنا اليوم للبدء.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-white/90">
                                تواصل معنا
                            </Button>
                        </Link>
                        <Link href="/order">
                            <Button variant="outline" size="lg" className="border-white/30 text-foreground hover:bg-white/10">
                                اطلب خدمة
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="mt-12 pt-8 border-t border-border">
                    <Link href="/case-studies">
                        <Button variant="outline" className="gap-2">
                            <ArrowRight className="w-4 h-4" />
                            عرض جميع دراسات الحالة
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
