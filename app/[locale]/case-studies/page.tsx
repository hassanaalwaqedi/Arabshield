"use client";

import { motion, Variants } from 'framer-motion';
import {
    Cpu,
    Globe,
    ShoppingCart,
    BarChart3,
    ShieldCheck,
    ArrowLeft,
    Layers,
    Code2,
    Database,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

// Mock Data for Case Studies
const caseStudies = [
    {
        id: 1,
        title: "منصة التجارة الإلكترونية الذكية",
        description: "تطوير منصة تجارة إلكترونية متكاملة تدعم الذكاء الاصطناعي لتقديم توصيات مخصصة وتجربة مستخدم سلسة، مما أدى لزيادة المبيعات بنسبة 40%.",
        category: "تطوير ويب",
        tech: ["Next.js", "Node.js", "AI Models", "Stripe"],
        icon: ShoppingCart,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "نظام إدارة الموارد المؤسسية (ERP)",
        description: "حل سحابي شامل لإدارة العمليات الداخلية للشركات الكبرى، يربط بين الموارد البشرية، المبيعات، والمحاسبة في لوحة تحكم موحدة.",
        category: "أنظمة مؤسسية",
        tech: ["React", "Python Django", "PostgreSQL", "Docker"],
        icon: BarChart3,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "تطبيق الخدمات اللوجستية وتتبع الشحنات",
        description: "تطبيق ذكي يتيح تتبع الشحنات في الوقت الفعلي باستخدام تقنيات الموقع الجغرافي، مع خوارزميات لتحسين مسارات التوصيل.",
        category: "تطبيقات جوال",
        tech: ["Flutter", "Firebase", "Google Maps API", "Redis"],
        icon: Globe,
        gradient: "from-orange-500 to-yellow-500"
    },
    {
        id: 4,
        title: "بوابة التعليم الرقمي التفاعلي",
        description: "منصة تعليمية تدعم الفصول الافتراضية المباشرة والمحتوى التفاعلي، مصممة لاستيعاب أكثر من 100 ألف طالب متزامن.",
        category: "تكنولوجيا التعليم",
        tech: ["Vue.js", "WebRTC", "AWS MediaLive", "Go"],
        icon: Cpu,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        id: 5,
        title: "نظام الحماية السيبرانية المصرفي",
        description: "تطوير طبقة حماية متقدمة للبنية التحتية البنكية، تعتمد على تعلم الآلة للكشف عن التهديدات والهجمات السيبرانية بشكل استباقي.",
        category: "الأمن السيبراني",
        tech: ["Rust", "TensorFlow", "Kafka", "K8s"],
        icon: ShieldCheck,
        gradient: "from-red-500 to-rose-600"
    },
    {
        id: 6,
        title: "منصة التحليل المالي بالذكاء الاصطناعي",
        description: "أداة متقدمة للمحللين الماليين تتيح معالجة البيانات الضخمة واستخراج التوقعات السوقية بدقة عالية وبسرعة فائقة.",
        category: "الذكاء الاصطناعي",
        tech: ["Python", "Pandas", "FastAPI", "React"],
        icon: Zap,
        gradient: "from-indigo-500 to-violet-500"
    }
];

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Splashes */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="electric" className="mb-6 px-4 py-1.5 text-sm">
                            أعمالنا المتميزة
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
                            دراسات الحالة ومشاريع النجاح
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            نفتخر بتقديم حلول تقنية مبتكرة لشركائنا. استكشف كيف ساهمنا في تحويل الأفكار الطموحة إلى واقع رقمي ملموس باستخدام أحدث التقنيات.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Case Studies Grid */}
            <div className="container mx-auto px-4 pb-32">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {caseStudies.map((study) => (
                        <motion.div
                            key={study.id}
                            variants={itemVariants}
                            className="group relative bg-card/50 hover:bg-card border border-border hover:border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col"
                        >
                            {/* Card Header / Visual */}
                            <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${study.gradient} p-0.5`}>
                                        <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                                            <study.icon className="w-7 h-7 text-foreground" />
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {study.category}
                                    </Badge>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-blue-400 transition-colors">
                                    {study.title}
                                </h3>

                                <p className="text-muted-foreground mb-6 leading-relaxed text-sm flex-1">
                                    {study.description}
                                </p>

                                <div className="space-y-6 mt-auto">
                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {study.tech.map((tech) => (
                                            <div key={tech} className="bg-muted/50 border border-border/50 px-2.5 py-1 rounded-md text-xs text-slate-300">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <Link href={`/case-studies/${study.id}`}>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-between hover:bg-muted text-slate-300 group-hover:text-foreground group/btn"
                                        >
                                            <span className="ml-2">اقرأ المزيد</span>
                                            <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </div>
    );
}
