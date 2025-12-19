"use client";

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Calendar,
    ArrowRight,
    Clock,
    User,
    Tag,
    Share2,
    Bookmark,
    ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

// Mock Articles Data (same as blog page)
const articles = [
    {
        id: 1,
        slug: "future-of-generative-ai-2026",
        title: "مستقبل الذكاء الاصطناعي التوليدي في 2026",
        excerpt: "استكشاف كيف سيغير الذكاء الاصطناعي التوليدي طريقة عملنا وإبداعنا في السنوات القادمة، مع التركيز على النماذج اللغوية الكبيرة.",
        content: `
الذكاء الاصطناعي التوليدي يمثل تحولاً جذرياً في عالم التكنولوجيا. من خلال نماذج مثل GPT-4 وما بعدها، أصبح بإمكان الآلات إنتاج محتوى إبداعي يضاهي ما ينتجه البشر.

## التطورات المتوقعة

### 1. نماذج أكثر ذكاءً
من المتوقع أن تصبح النماذج قادرة على فهم السياق بشكل أعمق، مع قدرة على التفكير المنطقي المعقد.

### 2. التكامل مع الأعمال
ستندمج أدوات الذكاء الاصطناعي بشكل سلس في سير العمل اليومي للشركات، من خدمة العملاء إلى إنتاج المحتوى.

### 3. الأخلاقيات والتنظيم
مع زيادة قدرات الذكاء الاصطناعي، ستظهر أطر تنظيمية أكثر صرامة لضمان الاستخدام المسؤول.

## التأثير على سوق العمل

بينما قد يحل الذكاء الاصطناعي محل بعض الوظائف، سيخلق أيضاً فرصاً جديدة في مجالات مثل:
- هندسة البرومبت
- تدريب وتحسين النماذج
- الإشراف على المحتوى المولد

## الخلاصة

الذكاء الاصطناعي التوليدي ليس مجرد تقنية جديدة، بل هو تحول في طريقة تفاعلنا مع التكنولوجيا. الشركات التي تتبنى هذه التقنية مبكراً ستحصل على ميزة تنافسية كبيرة.
        `,
        date: "12 ديسمبر 2025",
        readTime: "5 دقائق",
        category: "AI",
        categoryLabel: "ذكاء اصطناعي",
        imageGradient: "from-purple-600 to-blue-600",
        author: "أحمد محمد",
        authorRole: "خبير الذكاء الاصطناعي"
    },
    {
        id: 2,
        slug: "cybersecurity-cloud-computing",
        title: "أهمية الأمن السيبراني في عصر الحوسبة السحابية",
        excerpt: "دليل شامل حول أفضل الممارسات لحماية البيانات والأنظمة في البيئات السحابية المتزايدة التعقيد.",
        content: `
مع انتقال المزيد من الشركات إلى السحابة، تزداد أهمية الأمن السيبراني بشكل كبير.

## التحديات الرئيسية

### 1. البيانات الموزعة
عندما تتوزع البيانات عبر مراكز بيانات متعددة، تصبح حمايتها أكثر تعقيداً.

### 2. إدارة الهوية والوصول
التحكم في من يمكنه الوصول إلى أي موارد يعد من أهم التحديات.

### 3. التهديدات المتطورة
المهاجمون يطورون أساليبهم باستمرار لاختراق الأنظمة السحابية.

## أفضل الممارسات

1. **التشفير الشامل**: تشفير البيانات في حالة السكون والنقل
2. **المصادقة متعددة العوامل**: إضافة طبقات حماية إضافية
3. **المراقبة المستمرة**: رصد الأنشطة المشبوهة على مدار الساعة
4. **النسخ الاحتياطي**: الاحتفاظ بنسخ احتياطية آمنة ومنفصلة

## الخلاصة

الأمن السيبراني في السحابة يتطلب نهجاً شاملاً يجمع بين التقنية والسياسات والتدريب.
        `,
        date: "10 ديسمبر 2025",
        readTime: "7 دقائق",
        category: "Security",
        categoryLabel: "أمن سيبراني",
        imageGradient: "from-red-600 to-rose-600",
        author: "سارة علي",
        authorRole: "مستشارة الأمن السيبراني"
    },
    {
        id: 3,
        slug: "nextjs-16-trends",
        title: "أحدث اتجاهات تطوير الويب: Next.js 16 وما بعده",
        excerpt: "نظرة متعمقة على الميزات الجديدة في Next.js وكيف تساعد المطورين على بناء تطبيقات أسرع وأكثر كفاءة.",
        content: `
Next.js 16 يمثل قفزة نوعية في عالم تطوير الويب، مع ميزات جديدة تجعل بناء التطبيقات أسهل وأسرع.

## الميزات الجديدة

### 1. App Router المحسّن
تحسينات كبيرة في أداء التوجيه مع دعم أفضل للـ Streaming.

### 2. Server Components
مكونات الخادم تتيح تقليل حجم JavaScript المرسل للعميل.

### 3. Turbopack
محرك البناء الجديد أسرع بـ 10x من Webpack.

## أفضل الممارسات

- استخدم Server Components كلما أمكن
- استفد من التخزين المؤقت المدمج
- نظم مشروعك باستخدام هيكل App Directory

## الخلاصة

Next.js 16 يوفر أدوات قوية لبناء تطبيقات ويب حديثة وسريعة.
        `,
        date: "8 ديسمبر 2025",
        readTime: "6 دقائق",
        category: "WebDev",
        categoryLabel: "تطوير مواقع",
        imageGradient: "from-blue-500 to-cyan-500",
        author: "خالد عمر",
        authorRole: "مطور Full-Stack"
    },
    {
        id: 4,
        slug: "ransomware-protection",
        title: "كيف تحمي شركتك من هجمات الفدية؟",
        excerpt: "خطوات عملية واستراتيجيات فعالة لتقليل مخاطر التعرض لهجمات الفدية وحماية أصول الشركة الرقمية.",
        content: `
هجمات الفدية تشكل تهديداً متزايداً للشركات بجميع أحجامها.

## استراتيجيات الحماية

### 1. النسخ الاحتياطي المنتظم
احتفظ بنسخ احتياطية منفصلة وغير متصلة بالشبكة.

### 2. تحديث الأنظمة
حافظ على تحديث جميع البرامج وأنظمة التشغيل.

### 3. تدريب الموظفين
أكبر ثغرة أمنية هي العامل البشري.

## الخلاصة

الوقاية خير من العلاج، واستثمار في الأمان يوفر الكثير مستقبلاً.
        `,
        date: "5 ديسمبر 2025",
        readTime: "8 دقائق",
        category: "Security",
        categoryLabel: "أمن سيبراني",
        imageGradient: "from-orange-600 to-red-600",
        author: "محمد حسن",
        authorRole: "خبير أمن المعلومات"
    },
    {
        id: 5,
        slug: "5g-iot-impact",
        title: "تأثير الجيل الخامس 5G على تطبيقات إنترنت الأشياء",
        excerpt: "كيف تفتح تقنية 5G آفاقاً جديدة لتطبيقات إنترنت الأشياء والمدن الذكية والصناعة 4.0.",
        content: `
تقنية 5G تمثل نقلة نوعية في عالم الاتصالات وإنترنت الأشياء.

## المزايا الرئيسية

### 1. السرعة الفائقة
سرعات تصل إلى 10 جيجابت في الثانية.

### 2. زمن الاستجابة المنخفض
أقل من 1 ميلي ثانية، مثالي للتطبيقات الحرجة.

### 3. كثافة الاتصالات
دعم حتى مليون جهاز لكل كيلومتر مربع.

## التطبيقات

- المدن الذكية
- السيارات ذاتية القيادة
- الجراحة عن بعد
- الصناعة 4.0
        `,
        date: "1 ديسمبر 2025",
        readTime: "4 دقائق",
        category: "TechNews",
        categoryLabel: "أخبار تقنية",
        imageGradient: "from-emerald-600 to-teal-600",
        author: "ليلى محمود",
        authorRole: "محللة تقنية"
    },
    {
        id: 6,
        slug: "javascript-frameworks-comparison",
        title: "مقارنة بين أطر عمل JavaScript في 2025",
        excerpt: "مقارنة تفصيلية بين React و Vue و Svelte لمساعدتك في اختيار الإطار الأنسب لمشروعك القادم.",
        content: `
اختيار إطار العمل المناسب يعتمد على متطلبات المشروع وخبرة الفريق.

## React

### المميزات
- مجتمع ضخم
- نظام بيئي غني
- مرونة عالية

### العيوب
- منحنى تعلم حاد
- يحتاج مكتبات إضافية

## Vue

### المميزات
- سهل التعلم
- توثيق ممتاز
- أداء جيد

### العيوب
- مجتمع أصغر من React

## Svelte

### المميزات
- أداء فائق
- كود أقل
- بدون Virtual DOM

### العيوب
- نظام بيئي أصغر

## الخلاصة

لا يوجد إطار "أفضل" - الأفضل يعتمد على حالة استخدامك.
        `,
        date: "28 نوفمبر 2025",
        readTime: "10 دقائق",
        category: "WebDev",
        categoryLabel: "تطوير مواقع",
        imageGradient: "from-yellow-500 to-orange-500",
        author: "عمر خالد",
        authorRole: "مهندس برمجيات"
    }
];

export default function BlogArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Find article by slug or id
    const article = articles.find(a => a.slug === slug || a.id.toString() === slug);

    if (!article) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
                    <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على المقال المطلوب.</p>
                    <Link href="/blog">
                        <Button variant="glow">
                            <ArrowRight className="w-4 h-4 ml-2" />
                            العودة للمدونة
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">
            {/* Hero Section */}
            <div className={`relative pt-24 pb-16 bg-gradient-to-br ${article.imageGradient}`}>
                <div className="absolute inset-0 bg-background/60" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Back Button */}
                        <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                            العودة للمدونة
                        </Link>

                        <Badge className="mb-4 bg-white/20 backdrop-blur border-white/30 text-foreground">
                            {article.categoryLabel}
                        </Badge>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl">
                            {article.title}
                        </h1>

                        <p className="text-lg text-foreground/80 mb-8 max-w-3xl">
                            {article.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/70">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    {/* Share & Bookmark Actions */}
                    <div className="flex items-center gap-4 mb-12 pb-8 border-b border-border">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            مشاركة
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Bookmark className="w-4 h-4" />
                            حفظ
                        </Button>
                    </div>

                    {/* Article Body */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-bold prose-headings:text-foreground
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-slate-300 prose-p:leading-relaxed
                            prose-li:text-slate-300
                            prose-strong:text-foreground
                            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        "
                    >
                        <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2>').replace(/### /g, '<h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/<\/h2>/g, '</h2><p>').replace(/<\/h3>/g, '</h3><p>') }} />
                    </motion.article>

                    {/* Author Card */}
                    <div className="mt-16 p-6 bg-card/50 border border-border rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${article.imageGradient} flex items-center justify-center`}>
                                <User className="w-8 h-8 text-foreground" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">{article.author}</h4>
                                <p className="text-muted-foreground text-sm">{article.authorRole}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 pt-8 border-t border-border">
                        <Link href="/blog">
                            <Button variant="outline" className="gap-2">
                                <ArrowRight className="w-4 h-4" />
                                عرض جميع المقالات
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
