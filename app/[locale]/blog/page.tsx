"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    ArrowLeft,
    Clock,
    Tag,
    Newspaper,
    Cpu,
    Shield,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

// Blog Categories
type Category = 'All' | 'AI' | 'WebDev' | 'Security' | 'TechNews';

const categories: { id: Category; label: string; icon: any }[] = [
    { id: 'All', label: 'الكل', icon: Newspaper },
    { id: 'AI', label: 'ذكاء اصطناعي', icon: Cpu },
    { id: 'WebDev', label: 'تطوير مواقع', icon: Globe },
    { id: 'Security', label: 'أمن سيبراني', icon: Shield },
    { id: 'TechNews', label: 'أخبار تقنية', icon: Clock },
];

// Mock Articles Data
const articles = [
    {
        id: 1,
        slug: "future-of-generative-ai-2026",
        title: "مستقبل الذكاء الاصطناعي التوليدي في 2026",
        excerpt: "استكشاف كيف سيغير الذكاء الاصطناعي التوليدي طريقة عملنا وإبداعنا في السنوات القادمة، مع التركيز على النماذج اللغوية الكبيرة.",
        date: "12 ديسمبر 2025",
        readTime: "5 دقائق",
        category: "AI",
        imageGradient: "from-purple-600 to-blue-600",
        author: "أحمد محمد"
    },
    {
        id: 2,
        slug: "cybersecurity-cloud-computing",
        title: "أهمية الأمن السيبراني في عصر الحوسبة السحابية",
        excerpt: "دليل شامل حول أفضل الممارسات لحماية البيانات والأنظمة في البيئات السحابية المتزايدة التعقيد.",
        date: "10 ديسمبر 2025",
        readTime: "7 دقائق",
        category: "Security",
        imageGradient: "from-red-600 to-rose-600",
        author: "سارة علي"
    },
    {
        id: 3,
        slug: "nextjs-16-trends",
        title: "أحدث اتجاهات تطوير الويب: Next.js 16 وما بعده",
        excerpt: "نظرة متعمقة على الميزات الجديدة في Next.js وكيف تساعد المطورين على بناء تطبيقات أسرع وأكثر كفاءة.",
        date: "8 ديسمبر 2025",
        readTime: "6 دقائق",
        category: "WebDev",
        imageGradient: "from-blue-500 to-cyan-500",
        author: "خالد عمر"
    },
    {
        id: 4,
        slug: "ransomware-protection",
        title: "كيف تحمي شركتك من هجمات الفدية؟",
        excerpt: "خطوات عملية واستراتيجيات فعالة لتقليل مخاطر التعرض لهجمات الفدية وحماية أصول الشركة الرقمية.",
        date: "5 ديسمبر 2025",
        readTime: "8 دقائق",
        category: "Security",
        imageGradient: "from-orange-600 to-red-600",
        author: "محمد حسن"
    },
    {
        id: 5,
        slug: "5g-iot-impact",
        title: "تأثير الجيل الخامس 5G على تطبيقات إنترنت الأشياء",
        excerpt: "كيف تفتح تقنية 5G آفاقاً جديدة لتطبيقات إنترنت الأشياء والمدن الذكية والصناعة 4.0.",
        date: "1 ديسمبر 2025",
        readTime: "4 دقائق",
        category: "TechNews",
        imageGradient: "from-emerald-600 to-teal-600",
        author: "ليلى محمود"
    },
    {
        id: 6,
        slug: "javascript-frameworks-comparison",
        title: "مقارنة بين أطر عمل JavaScript في 2025",
        excerpt: "مقارنة تفصيلية بين React و Vue و Svelte لمساعدتك في اختيار الإطار الأنسب لمشروعك القادم.",
        date: "28 نوفمبر 2025",
        readTime: "10 دقائق",
        category: "WebDev",
        imageGradient: "from-yellow-500 to-orange-500",
        author: "عمر خالد"
    }
];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filteredArticles = articles.filter(article =>
        activeCategory === 'All' || article.category === activeCategory
    );

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Header Section */}
            <div className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="purple" className="mb-6 px-4 py-1.5 text-sm">
                            المدونة التقنية
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-l from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            رؤى وأفكار للمستقبل
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            اكتشف أحدث المقالات والأخبار في عالم التكنولوجيا، من الذكاء الاصطناعي إلى تطوير البرمجيات والأمن السيبراني.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Categories Filter */}
            <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md py-4 border-b border-border/50 mb-12">
                <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex justify-start md:justify-center gap-3 min-w-max px-2">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat.id
                                        ? 'bg-blue-600 border-blue-500 text-foreground shadow-lg shadow-blue-500/25'
                                        : 'bg-card border-border text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-4 pb-32">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredArticles.map((article, index) => (
                            <motion.div
                                layout
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group h-full"
                            >
                                <Card className="bg-card/40 border-border overflow-hidden h-full flex flex-col hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-2">
                                    {/* Article Image Placeholder */}
                                    <div className={`h-52 w-full bg-gradient-to-br ${article.imageGradient} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-card/10 group-hover:bg-transparent transition-colors duration-500" />

                                        {/* Category Badge Over Image */}
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-background/80 backdrop-blur text-foreground border-0">
                                                {categories.find(c => c.id === article.category)?.label}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{article.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{article.readTime}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                                            {article.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                            <span className="text-xs text-muted-foreground font-medium">
                                                بقلم: {article.author}
                                            </span>
                                            <Link href={`/blog/${article.slug}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent group/btn"
                                                >
                                                    اقرأ المزيد
                                                    <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover/btn:-translate-x-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

        </div>
    );
}
