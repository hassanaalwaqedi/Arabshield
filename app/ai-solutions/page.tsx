"use client";

import { motion, Variants } from 'framer-motion';
import {
    Bot,
    BarChart3,
    Sparkles,
    Crosshair,
    Eye,
    ArrowLeft,
    BrainCircuit,
    Cpu,
    Network
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

// AI Services Data
const services = [
    {
        id: "chatbots",
        title: "أنظمة المحادثة الذكية (Chatbots)",
        description: "روبوتات محادثة متطورة تعتمد على نماذج LLaMA و GPT لتقديم دعم فوري وذكي للعملاء على مدار الساعة، مع قدرة عالية على فهم اللهجات المحلية.",
        icon: Bot,
        gradient: "from-blue-500 to-cyan-500",
        features: ["دعم متعدد اللغات", "تكامل مع CRM", "تعلم مستمر"]
    },
    {
        id: "data-analysis",
        title: "تحليل البيانات والتنبؤ",
        description: "خوارزميات متقدمة لتحويل البيانات الضخمة إلى رؤى قابلة للتنفيذ، مما يساعد في اتخاذ قرارات استراتيجية مبنية على حقائق دقيقة.",
        icon: BarChart3,
        gradient: "from-purple-500 to-pink-500",
        features: ["توقعات المبيعات", "تحليل سلوك العملاء", "لوحات تحكم تفاعلية"]
    },
    {
        id: "content-gen",
        title: "توليد المحتوى الإبداعي",
        description: "أدوات ذكية لإنشاء نصوص وصور وفيديوهات تسويقية عالية الجودة، مصممة لتتناسب مع هوية علامتك التجارية وتجذب جمهورك المستهدف.",
        icon: Sparkles,
        gradient: "from-orange-500 to-yellow-500",
        features: ["كتابة المقالات", "تصميم الجرافيك", "أتمتة النشر"]
    },
    {
        id: "recommendations",
        title: "نظم التوصية الشخصية",
        description: "محركات توصية ذكية تقترح المنتجات والمحتوى المناسب لكل مستخدم بناءً على تفضيلاته وسلوكه السابق، مما يزيد من معدلات التحويل.",
        icon: Crosshair,
        gradient: "from-emerald-500 to-teal-500",
        features: ["زيادة المبيعات", "تحسين تجربة المستخدم", "تخصيص العروض"]
    },
    {
        id: "vision",
        title: "الرؤية الحاسوبية (Computer Vision)",
        description: "حلول قادرة على تحليل الصور والفيديوهات للتعرف على الوجوه، فحص الجودة، ومراقبة الأمن بدقة عالية وبشكل آلي.",
        icon: Eye,
        gradient: "from-red-500 to-rose-600",
        features: ["التعرف على الوجه", "مراقبة الجودة", "تحليل المشاعر"]
    }
];

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function AISolutionsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white" dir="rtl">

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                                <BrainCircuit className="w-10 h-10 text-blue-500" />
                            </div>
                        </div>

                        <Badge variant="purple" className="mb-6 px-4 py-1.5 text-sm">
                            الجيل القادم من التكنولوجيا
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent leading-tight">
                            حلول الذكاء الاصطناعي للمؤسسات
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            نمكن المؤسسات من استغلال قوة الذكاء الاصطناعي لتحسين الكفاءة، تقليل التكاليف، وابتكار تجارب عملاء استثنائية.
                            من الأتمتة البسيطة إلى النماذج المعقدة، نحن شريكك في رحلة التحول الذكي.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Services Icons Abstract Visualization */}
            <div className="container mx-auto px-4 mb-20">
                <div className="flex justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <Cpu className="w-12 h-12 animate-bounce delay-0 duration-[3000ms]" />
                    <Network className="w-12 h-12 animate-bounce delay-100 duration-[3000ms]" />
                    <Bot className="w-12 h-12 animate-bounce delay-200 duration-[3000ms]" />
                    <BrainCircuit className="w-12 h-12 animate-bounce delay-300 duration-[3000ms]" />
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 pb-32">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            className="h-full"
                        >
                            <Card className="h-full bg-slate-900/40 border-slate-800 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 group overflow-hidden relative">
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className="p-8 flex flex-col h-full relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                                            <service.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-xs text-slate-500">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} ml-2`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* CTA Card as the last item if needed, or separate section */}
                    <motion.div
                        variants={itemVariants}
                        className="h-full flex flex-col justify-center items-center p-8 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20 text-center"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">
                            هل تبحث عن حل مخصص؟
                        </h3>
                        <p className="text-slate-400 text-sm mb-6">
                            لدينا فريق من مهندسي الذكاء الاصطناعي الجاهز لبناء نموذجك الخاص.
                        </p>
                        <Button variant="glow" className="w-full">
                            تواصل معنا
                            <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom CTA Section */}
            <div className="border-t border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 pointer-events-none" />
                <div className="container mx-auto px-4 py-20 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        جاهز لنقل عملك إلى المستقبل؟
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
                        احجز جلسة استشارية مجانية مع خبرائنا لمناقشة كيف يمكن للذكاء الاصطناعي أن يخدم أهدافك.
                    </p>
                    <div className="flex justify-center">
                        <Button variant="primary" size="lg" className="rounded-full px-10 text-lg shadow-purple-500/20 shadow-lg">
                            اطلب استشارة ذكاء اصطناعي
                            <ArrowLeft className="w-5 h-5 mr-2" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
