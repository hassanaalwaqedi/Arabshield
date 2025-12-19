"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    Smartphone,
    Brain,
    ArrowLeft,
    Layers,
    ExternalLink,
    Code
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

// Project Categories
type Category = 'All' | 'Web' | 'Mobile' | 'AI';

const categories: Category[] = ['All', 'Web', 'Mobile', 'AI'];

// Mock Project Data
const projects = [
    {
        id: 1,
        title: "منصة إنجاز التعليمية",
        description: "منصة تعليمية متكاملة لإدارة الفصول الافتراضية والواجبات المدرسية مع نظام تتبع للطلاب.",
        category: "Web",
        imageGradient: "from-blue-500 to-cyan-500",
        tech: ["Next.js", "Tailwind", "PostgreSQL"],
        link: "#"
    },
    {
        id: 2,
        title: "تطبيق صحتي",
        description: "تطبيق جوال لمتابعة الحالة الصحية للمرضى وحجز المواعيد الطبية عن بعد.",
        category: "Mobile",
        imageGradient: "from-green-500 to-emerald-600",
        tech: ["Flutter", "Firebase", "HealthKit"],
        link: "#"
    },
    {
        id: 3,
        title: "نظام التحليل المالي الذكي",
        description: "أداة تعتمد على الذكاء الاصطناعي لتحليل البيانات المالية وتقديم توقعات دقيقة للأسواق.",
        category: "AI",
        imageGradient: "from-purple-600 to-indigo-600",
        tech: ["Python", "TensorFlow", "FastAPI"],
        link: "#"
    },
    {
        id: 4,
        title: "متجر الأزياء العصرية",
        description: "متجر إلكتروني بتصميم عصري وتجربة مستخدم سلسة مع بوابة دفع آمنة.",
        category: "Web",
        imageGradient: "from-pink-500 to-rose-500",
        tech: ["Shopify", "Liquid", "React"],
        link: "#"
    },
    {
        id: 5,
        title: "تطبيق توصيل الطلبات",
        description: "شبكة لوجستية لربط المندوبين بالعملاء مع تتبع حي للموقع الجغرافي.",
        category: "Mobile",
        imageGradient: "from-orange-500 to-amber-500",
        tech: ["React Native", "Google Maps", "Node.js"],
        link: "#"
    },
    {
        id: 6,
        title: "بوت خدمة العملاء الآلي",
        description: "شات بوت ذكي للرد على استفسارات العملاء بشكل فوري ودقيق على مدار الساعة.",
        category: "AI",
        imageGradient: "from-teal-500 to-cyan-600",
        tech: ["OpenAI API", "LangChain", "Redis"],
        link: "#"
    }
];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filteredProjects = projects.filter(project =>
        activeCategory === 'All' || project.category === activeCategory
    );

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="cyan" className="mb-6 px-4 py-1.5 text-sm">
                            معرض الأعمال
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
                            ابتكاراتنا ومشاريعنا
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            نحول الأفكار إلى واقع رقمي مبهر. استعرض مجموعة من مشاريعنا الناجحة التي ساعدت عملاءنا على تحقيق أهدافهم والتميز في مجالاتهم.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="container mx-auto px-4 mb-16">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === category
                                    ? 'bg-blue-600 border-blue-500 text-foreground shadow-lg shadow-blue-500/25 scale-105'
                                    : 'bg-card border-border text-muted-foreground hover:border-slate-600 hover:text-foreground'
                                }`}
                        >
                            {category === 'All' && 'الكل'}
                            {category === 'Web' && 'مواقع إلكترونية'}
                            {category === 'Mobile' && 'تطبيقات جوال'}
                            {category === 'AI' && 'ذكاء اصطناعي'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 pb-32">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group"
                            >
                                <Card className="bg-card/50 border-border overflow-hidden h-full flex flex-col hover:border-blue-500/30 transition-colors duration-300">
                                    {/* Project Image Placeholder */}
                                    <div className={`h-48 w-full bg-gradient-to-br ${project.imageGradient} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                                        <div className="absolute inset-0 bg-card/20 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/40">
                                            <Button variant="outline" size="sm" className="rounded-full border-white text-foreground hover:bg-white hover:text-slate-900">
                                                مشاهدة المشروع
                                                <ExternalLink className="mr-2 w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                                {project.category === 'Web' && <Globe className="w-3 h-3 ml-1" />}
                                                {project.category === 'Mobile' && <Smartphone className="w-3 h-3 ml-1" />}
                                                {project.category === 'AI' && <Brain className="w-3 h-3 ml-1" />}
                                                {project.category}
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                                            {project.tech.map((t) => (
                                                <span key={t} className="text-[10px] text-muted-foreground bg-background px-2 py-1 rounded border border-border">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border bg-card/30">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                        هل لديك مشروع في ذهنك؟
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
                        نحن هنا لمساعدتك في تحويل فكرتك إلى واقع. دعنا نبني شيئاً استثنائياً معاً.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="primary" size="lg" className="rounded-full px-8">
                            ابدأ مشروعك معنا
                            <ArrowLeft className="w-5 h-5 mr-2" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
