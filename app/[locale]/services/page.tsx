"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Smartphone, Monitor, Code, Cloud, Lock, BarChart, ArrowRight, CheckCircle, Zap, Users, TrendingUp, Shield, Sparkles, Rocket, Brain, Database } from 'lucide-react';

// Service Card Component with Enhanced Animations
interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    popular?: boolean;
    startNowText: string;
    mostPopularText: string;
}

function ServiceCard({ icon: Icon, title, description, features, popular, startNowText, mostPopularText }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${popular
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400 shadow-2xl shadow-blue-600/30 scale-105'
                : 'bg-card border-border hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                }`}
            style={{
                transform: isHovered && !popular ? 'translateY(-8px)' : popular ? 'scale(1.05)' : 'none'
            }}
        >
            {popular && (
                <div className="absolute -top-4 right-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {mostPopularText}
                    </div>
                </div>
            )}

            {/* Icon with Animation */}
            <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${popular
                ? 'bg-white/20 backdrop-blur-sm'
                : 'bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110'
                }`}>
                <Icon className={`w-8 h-8 transition-all duration-500 ${popular ? 'text-foreground' : 'text-blue-400 group-hover:scale-110'
                    }`} />

                {/* Animated Ring */}
                {isHovered && !popular && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-ping"></div>
                )}
            </div>

            {/* Content */}
            <h3 className={`text-2xl font-bold mb-3 ${popular ? 'text-foreground' : 'text-foreground'}`}>
                {title}
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${popular ? 'text-blue-100' : 'text-muted-foreground'
                }`}>
                {description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${popular ? 'text-foreground' : 'text-blue-400'
                            }`} />
                        <span className={`text-xs ${popular ? 'text-blue-50' : 'text-muted-foreground'}`}>
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <button className={`group/btn w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${popular
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-blue-600 text-foreground hover:bg-blue-500'
                }`}>
                {startNowText}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}

// Process Step Component
interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
    return (
        <div className="relative flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-foreground text-2xl font-bold shadow-lg shadow-blue-500/30 mb-4">
                {number}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    );
}

// Benefit Card Component
interface BenefitCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
    return (
        <div className="p-6 rounded-2xl bg-card/50 border border-border hover:border-border transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-foreground font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
}

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "outline";
    className?: string;
}

function Button({ children, variant = "primary", className = "" }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-foreground shadow-lg shadow-blue-600/30",
        outline: "bg-transparent border-2 border-border hover:border-slate-600 text-foreground"
    };

    return (
        <button className={`inline-flex items-center justify-center px-8 h-12 rounded-xl font-semibold transition-all duration-200 group ${variants[variant]} ${className}`}>
            {children}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
    );
}

// Main Services Page Component
export default function ServicesPage() {
    const t = useTranslations('services');

    const services = [
        {
            icon: Monitor,
            title: t('webDev.title'),
            description: t('webDev.description'),
            features: t.raw('webDev.features') as string[]
        },
        {
            icon: Smartphone,
            title: t('mobileDev.title'),
            description: t('mobileDev.description'),
            features: t.raw('mobileDev.features') as string[],
            popular: true
        },
        {
            icon: Code,
            title: t('customSoftware.title'),
            description: t('customSoftware.description'),
            features: t.raw('customSoftware.features') as string[]
        },
        {
            icon: Cloud,
            title: t('cloudSolutions.title'),
            description: t('cloudSolutions.description'),
            features: t.raw('cloudSolutions.features') as string[]
        },
        {
            icon: Lock,
            title: t('cybersecurity.title'),
            description: t('cybersecurity.description'),
            features: t.raw('cybersecurity.features') as string[]
        },
        {
            icon: Brain,
            title: t('aiSolutions.title'),
            description: t('aiSolutions.description'),
            features: t.raw('aiSolutions.features') as string[]
        }
    ];

    const benefits = [
        { icon: Users, title: t('whyChooseUs.expertTeam.title'), description: t('whyChooseUs.expertTeam.description') },
        { icon: TrendingUp, title: t('whyChooseUs.provenResults.title'), description: t('whyChooseUs.provenResults.description') },
        { icon: Shield, title: t('whyChooseUs.secureCompliant.title'), description: t('whyChooseUs.secureCompliant.description') },
        { icon: Zap, title: t('whyChooseUs.fastDelivery.title'), description: t('whyChooseUs.fastDelivery.description') }
    ];

    const process = [
        { number: '01', title: t('process.discovery.title'), description: t('process.discovery.description') },
        { number: '02', title: t('process.planning.title'), description: t('process.planning.description') },
        { number: '03', title: t('process.development.title'), description: t('process.development.description') },
        { number: '04', title: t('process.launch.title'), description: t('process.launch.description') }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                {/* Animated Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Rocket className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">{t('badge')}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            {...service}
                            startNowText={t('startNow')}
                            mostPopularText={t('mostPopular')}
                        />
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{t('whyChooseUs.title')}</h2>
                        <p className="text-muted-foreground text-lg">{t('whyChooseUs.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <BenefitCard key={idx} {...benefit} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{t('process.title')}</h2>
                        <p className="text-muted-foreground text-lg">{t('process.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connection Lines */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>

                        {process.map((step, idx) => (
                            <ProcessStep key={idx} {...step} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Technologies Section */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{t('technologies.title')}</h2>
                        <p className="text-muted-foreground text-lg">{t('technologies.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {['React', 'Next.js', 'Flutter', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'TensorFlow', 'TypeScript', 'Kubernetes'].map((tech, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-card/50 border border-border hover:border-blue-500/50 transition-all text-center group cursor-pointer">
                                <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Database className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-slate-300 text-sm font-medium">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary">
                                {t('cta.startNow')}
                            </Button>
                            <Button variant="outline">
                                {t('cta.viewPortfolio')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}