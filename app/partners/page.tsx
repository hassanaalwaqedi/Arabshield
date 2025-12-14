"use client";

import { motion, Variants } from 'framer-motion';
import {
    Cloud,
    Database,
    Cpu,
    Code2,
    Globe,
    Zap,
    Server,
    ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Partner/Tech Data
const partners = [
    { name: "Next.js", icon: Globe, color: "text-white" },
    { name: "Vercel", icon: Zap, color: "text-white" },
    { name: "AWS", icon: Cloud, color: "text-orange-500" },
    { name: "Google Cloud", icon: Server, color: "text-blue-500" },
    { name: "Meta LLaMA", icon: BrainIcon, color: "text-blue-400" },
    { name: "OpenAI", icon: Cpu, color: "text-emerald-500" },
    { name: "Firebase", icon: Database, color: "text-yellow-500" },
];

function BrainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
    )
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white" dir="rtl">

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Badge variant="electric" className="mb-6 px-4 py-1.5 text-sm">
                            شراكات استراتيجية
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-white via-blue-100 to-slate-400 bg-clip-text text-transparent leading-tight">
                            نبني المستقبل مع العمالقة
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            نؤمن بأن النجاح الحقيقي يأتي من خلال التعاون مع الأفضل. لذلك نقوم ببناء حلولنا باستخدام تقنيات ومنصات شركائنا العالميين لضمان أعلى معايير الأداء والأمان.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Logos Grid */}
            <div className="container mx-auto px-4 pb-32">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            className="group relative flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-900 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                        >
                            <div className={`p-4 rounded-full bg-slate-950/50 mb-4 group-hover:bg-slate-950 transition-colors ${partner.color}`}>
                                <partner.icon className="w-10 h-10" />
                            </div>
                            <span className="font-semibold text-lg text-slate-300 group-hover:text-white transition-colors">
                                {partner.name}
                            </span>
                        </motion.div>
                    ))}

                    {/* "More" Card */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500"
                    >
                        <Code2 className="w-10 h-10 mb-4 opacity-50" />
                        <span className="font-medium">وغيرهم الكثير...</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Benefits Text Section */}
            <div className="container mx-auto px-4 pb-24">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">قوة الشراكات التقنية</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-0">
                            من خلال شراكاتنا مع رواد التكنولوجيا، نمكن عملاءنا من الوصول إلى أحدث الأدوات والتقنيات فور صدورها. هذا يضمن أن مشاريعكم ليست فقط حديثة اليوم، بل جاهزة للمستقبل وقابلة للتوسع بلا حدود.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                        هل أنت مقدم خدمات تقنية؟
                    </h2>
                    <div className="flex justify-center">
                        <Button variant="glow" size="lg" className="rounded-full px-10 text-lg">
                            كن شريكاً معنا
                            <ArrowLeft className="w-5 h-5 mr-2" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
