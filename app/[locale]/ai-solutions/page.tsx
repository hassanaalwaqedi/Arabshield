"use client";

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
import Link from 'next/link';

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
    const t = useTranslations('aiSolutions');

    // AI Services Data with translations
    const services = [
        {
            id: "chatbots",
            title: t('services.chatbots.title'),
            description: t('services.chatbots.description'),
            icon: Bot,
            gradient: "from-blue-500 to-cyan-500",
            features: t.raw('services.chatbots.features') as string[]
        },
        {
            id: "data-analysis",
            title: t('services.dataAnalysis.title'),
            description: t('services.dataAnalysis.description'),
            icon: BarChart3,
            gradient: "from-purple-500 to-pink-500",
            features: t.raw('services.dataAnalysis.features') as string[]
        },
        {
            id: "content-gen",
            title: t('services.contentGen.title'),
            description: t('services.contentGen.description'),
            icon: Sparkles,
            gradient: "from-orange-500 to-yellow-500",
            features: t.raw('services.contentGen.features') as string[]
        },
        {
            id: "recommendations",
            title: t('services.recommendations.title'),
            description: t('services.recommendations.description'),
            icon: Crosshair,
            gradient: "from-emerald-500 to-teal-500",
            features: t.raw('services.recommendations.features') as string[]
        },
        {
            id: "vision",
            title: t('services.vision.title'),
            description: t('services.vision.description'),
            icon: Eye,
            gradient: "from-red-500 to-rose-600",
            features: t.raw('services.vision.features') as string[]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">

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
                            <Badge variant="electric" className="text-sm px-4 py-1.5 flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4" />
                                {t('badge')}
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Services Grid */}
            <motion.div
                className="container mx-auto px-4 pb-24"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <motion.div key={service.id} variants={itemVariants}>
                                <Card className="h-full p-8 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px] mb-6`}>
                                        <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                            <Icon className="w-7 h-7 text-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature, idx) => (
                                            <span key={idx} className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Custom Solution CTA */}
            <div className="container mx-auto px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 p-12 overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Cpu className="w-64 h-64 text-indigo-500/5" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-start">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('lookingForCustom')}</h3>
                            <p className="text-muted-foreground">{t('customDescription')}</p>
                        </div>
                        <Link href="/contact">
                            <Button variant="glow" size="lg" className="whitespace-nowrap">
                                <Network className="w-5 h-5 ml-2" />
                                {t('contactUs')}
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Final CTA */}
            <div className="border-t border-border">
                <div className="container mx-auto px-4 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('ctaTitle')}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t('ctaDescription')}</p>
                        <Link href="/contact">
                            <Button variant="primary" size="lg">
                                <ArrowLeft className="w-5 h-5 ml-2" />
                                {t('ctaButton')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
