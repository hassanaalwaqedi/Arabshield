"use client";

import { useState } from 'react';
import { Smartphone, Monitor, Code, Cloud, Lock, BarChart, ArrowRight, CheckCircle, Zap, Users, TrendingUp, Shield, Sparkles, Rocket, Brain, Database } from 'lucide-react';

// Service Card Component with Enhanced Animations
interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    popular?: boolean;
}

function ServiceCard({ icon: Icon, title, description, features, popular }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${popular
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400 shadow-2xl shadow-blue-600/30 scale-105'
                : 'bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
                }`}
            style={{
                transform: isHovered && !popular ? 'translateY(-8px)' : popular ? 'scale(1.05)' : 'none'
            }}
        >
            {popular && (
                <div className="absolute -top-4 right-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Popular
                    </div>
                </div>
            )}

            {/* Icon with Animation */}
            <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${popular
                ? 'bg-white/20 backdrop-blur-sm'
                : 'bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110'
                }`}>
                <Icon className={`w-8 h-8 transition-all duration-500 ${popular ? 'text-white' : 'text-blue-400 group-hover:scale-110'
                    }`} />

                {/* Animated Ring */}
                {isHovered && !popular && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-ping"></div>
                )}
            </div>

            {/* Content */}
            <h3 className={`text-2xl font-bold mb-3 ${popular ? 'text-white' : 'text-white'}`}>
                {title}
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${popular ? 'text-blue-100' : 'text-slate-400'
                }`}>
                {description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${popular ? 'text-white' : 'text-blue-400'
                            }`} />
                        <span className={`text-xs ${popular ? 'text-blue-50' : 'text-slate-400'}`}>
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <button className={`group/btn w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${popular
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}>
                Get Started
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-4">
                {number}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm">{description}</p>
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
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
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
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
        outline: "bg-transparent border-2 border-slate-700 hover:border-slate-600 text-white"
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
    const services = [
        {
            icon: Monitor,
            title: 'Web Development',
            description: 'Fast, responsive, and secure websites that drive traffic and convert visitors.',
            features: [
                'Custom responsive design',
                'Next.js & React applications',
                'E-commerce platforms',
                'SEO optimization',
                'Performance tuning'
            ]
        },
        {
            icon: Smartphone,
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile apps for iOS and Android.',
            features: [
                'iOS & Android development',
                'Flutter & React Native',
                'App Store deployment',
                'Push notifications',
                'Offline functionality'
            ],
            popular: true
        },
        {
            icon: Code,
            title: 'Custom Software',
            description: 'Tailored solutions designed for your unique business requirements.',
            features: [
                'Process automation',
                'API development',
                'Database design',
                'Legacy modernization',
                'Third-party integrations'
            ]
        },
        {
            icon: Cloud,
            title: 'Cloud Solutions',
            description: 'Secure and scalable cloud infrastructure setup and management.',
            features: [
                'AWS, Azure, GCP expertise',
                'Cloud migration',
                'DevOps & CI/CD',
                'Infrastructure as Code',
                'Cost optimization'
            ]
        },
        {
            icon: Lock,
            title: 'Cyber Security',
            description: 'Protect your business assets from digital threats.',
            features: [
                'Security audits',
                'Penetration testing',
                'Compliance (SOC2, GDPR)',
                'Threat monitoring',
                'Incident response'
            ]
        },
        {
            icon: Brain,
            title: 'AI Solutions',
            description: 'Intelligent automation and machine learning systems.',
            features: [
                'Custom AI models',
                'Natural language processing',
                'Computer vision',
                'Predictive analytics',
                'Chatbots & automation'
            ]
        }
    ];

    const benefits = [
        { icon: Users, title: 'Expert Team', description: '50+ certified professionals across all technologies' },
        { icon: TrendingUp, title: 'Proven Results', description: '98% client satisfaction and project success rate' },
        { icon: Shield, title: 'Secure & Compliant', description: 'Industry-leading security and compliance standards' },
        { icon: Zap, title: 'Fast Delivery', description: 'Agile methodologies for rapid development cycles' }
    ];

    const process = [
        { number: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
        { number: '02', title: 'Planning', description: 'Strategic roadmap and timeline' },
        { number: '03', title: 'Development', description: 'Agile sprints with regular updates' },
        { number: '04', title: 'Launch', description: 'Deployment and ongoing support' }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
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
                        <span className="text-sm text-blue-300 font-medium">Comprehensive Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Our Services
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive technology solutions tailored to propel your business forward in the digital age. From concept to deployment and beyond.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} {...service} />
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
                        <p className="text-slate-400 text-lg">We deliver excellence at every step</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <BenefitCard key={idx} {...benefit} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Process</h2>
                        <p className="text-slate-400 text-lg">How we bring your vision to life</p>
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
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Technologies We Use</h2>
                        <p className="text-slate-400 text-lg">Cutting-edge tools and frameworks</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {['React', 'Next.js', 'Flutter', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'TensorFlow', 'TypeScript', 'Kubernetes'].map((tech, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all text-center group cursor-pointer">
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
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Let's discuss how our services can transform your business and help you achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary">
                                Get Started
                            </Button>
                            <Button variant="outline">
                                View Portfolio
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}