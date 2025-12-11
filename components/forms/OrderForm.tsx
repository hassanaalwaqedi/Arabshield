"use client";

import { useState } from 'react';
import { Send, CheckCircle, Globe, Smartphone, Shield, Brain, Briefcase, Clock, DollarSign, FileCheck, ChevronDown, Zap, Users, Lock, TrendingUp } from 'lucide-react';

// Service Card Component
interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    features: string[];
    selected: boolean;
    onClick: () => void;
}

function ServiceCard({ icon: Icon, title, description, features, selected, onClick }: ServiceCardProps) {
    return (
        <div
            onClick={onClick}
            className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selected
                ? 'border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/20'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50'
                }`}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${selected ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700 group-hover:bg-slate-600'
                }`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-4">{description}</p>
            <ul className="space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-slate-500 flex items-center">
                        <div className="w-1 h-1 rounded-full bg-slate-600 mr-2"></div>
                        {feature}
                    </li>
                ))}
            </ul>
            {selected && (
                <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
            )}
        </div>
    );
}

// FAQ Item Component
interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/30">
            <button
                onClick={onClick}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
            >
                <span className="font-semibold text-white">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}

// Input Component
interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

function Input({ label, type = "text", placeholder, required = false, value, onChange, className = "" }: InputProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
                {label} {required && <span className="text-blue-400">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full h-12 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${className}`}
            />
        </div>
    );
}

// Select Component
interface SelectProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
}

function Select({ label, required = false, value, onChange, options, placeholder }: SelectProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
                {label} {required && <span className="text-blue-400">*</span>}
            </label>
            <div className="relative">
                <select
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="w-full h-12 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                    <option value="">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

function Button({ children, onClick, variant = "primary", className = "", isLoading = false, disabled = false }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white"
    };

    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`inline-flex items-center justify-center px-8 h-14 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </>
            ) : children}
        </button>
    );
}

// Main Order Page Component
export default function OrderPage() {
    const [selectedService, setSelectedService] = useState('');
    const [formStep, setFormStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        details: ''
    });

    const services = [
        {
            id: 'web',
            icon: Globe,
            title: 'Website Development',
            description: 'Modern, responsive websites built with cutting-edge technologies',
            features: ['Custom Design', 'SEO Optimized', 'Mobile First', 'Fast Performance']
        },
        {
            id: 'app',
            icon: Smartphone,
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications',
            features: ['iOS & Android', 'Cloud Integration', 'Real-time Features', 'Scalable Architecture']
        },
        {
            id: 'security',
            icon: Shield,
            title: 'Cybersecurity Protection',
            description: 'Enterprise-grade security solutions and audits',
            features: ['Threat Detection', 'Compliance', 'Penetration Testing', '24/7 Monitoring']
        },
        {
            id: 'ai',
            icon: Brain,
            title: 'AI Solutions',
            description: 'Intelligent automation and machine learning systems',
            features: ['Custom AI Models', 'Automation', 'Data Analytics', 'Predictive Insights']
        },
        {
            id: 'enterprise',
            icon: Briefcase,
            title: 'Enterprise Solutions',
            description: 'Custom software for complex business needs',
            features: ['Tailored Solutions', 'Integration', 'Support', 'Training']
        }
    ];

    const faqs = [
        {
            question: 'What is your typical project timeline?',
            answer: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation.'
        },
        {
            question: 'How does pricing work?',
            answer: 'We offer transparent, project-based pricing. After understanding your requirements, we provide a detailed proposal with milestones and payment terms. Typical projects range from $3,000 to $100,000+ depending on scope.'
        },
        {
            question: 'Do you offer ongoing support?',
            answer: 'Yes! We provide comprehensive maintenance packages including updates, security patches, performance optimization, and 24/7 technical support for critical systems.'
        },
        {
            question: 'What security measures do you implement?',
            answer: 'We follow industry best practices including encryption, secure authentication, regular security audits, compliance with GDPR/SOC2, and continuous monitoring for threats.'
        },
        {
            question: 'Can you integrate with our existing systems?',
            answer: 'Absolutely. We specialize in seamless integrations with popular platforms, APIs, and legacy systems. Our team ensures smooth data migration and system compatibility.'
        }
    ];

    const handleServiceSelect = (serviceId: string) => {
        setSelectedService(serviceId);
        setFormData({ ...formData, service: serviceId });
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || !formData.service || !formData.budget || !formData.details) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setSubmitted(true);
    };

    const handleReset = () => {
        setSubmitted(false);
        setFormStep(1);
        setSelectedService('');
        setFormData({
            fullName: '',
            email: '',
            company: '',
            service: '',
            budget: '',
            details: ''
        });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 shadow-2xl">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Request Received Successfully
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                            Thank you for choosing ArabShield. Our enterprise team will review your requirements and contact you within 24 hours with a detailed proposal.
                        </p>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>Response in 24h</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <FileCheck className="w-4 h-4" />
                                <span>Detailed Proposal</span>
                            </div>
                        </div>
                        <Button onClick={handleReset} variant="secondary" className="mx-auto">
                            Submit Another Request
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">Enterprise Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Request a Service
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Transform your business with cutting-edge technology solutions. From web development to AI-powered automation, we deliver enterprise-grade systems that scale.
                    </p>
                </div>
            </div>

            {/* Service Selection */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Service</h2>
                    <p className="text-slate-400 text-lg">Select the service that best fits your needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            {...service}
                            selected={selectedService === service.id}
                            onClick={() => handleServiceSelect(service.id)}
                        />
                    ))}
                </div>

                {/* Order Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <FileCheck className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Project Details</h3>
                                <p className="text-slate-400 text-sm">Tell us about your requirements</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Full Name"
                                    required
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    required
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <Input
                                label="Company Name"
                                placeholder="Your Company Inc. (Optional)"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />

                            <Select
                                label="Service Type"
                                required
                                placeholder="Select a service"
                                value={formData.service}
                                onChange={(e) => {
                                    setFormData({ ...formData, service: e.target.value });
                                    setSelectedService(e.target.value);
                                }}
                                options={services.map(s => ({ value: s.id, label: s.title }))}
                            />

                            <Select
                                label="Estimated Budget"
                                required
                                placeholder="Select budget range"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                options={[
                                    { value: 'small', label: '$3,000 - $10,000' },
                                    { value: 'medium', label: '$10,000 - $50,000' },
                                    { value: 'large', label: '$50,000 - $100,000' },
                                    { value: 'enterprise', label: '$100,000+' }
                                ]}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                    Project Description <span className="text-blue-400">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Describe your project goals, key features, timeline expectations, and any specific requirements..."
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                variant="primary"
                                className="w-full text-lg"
                                isLoading={loading}
                            >
                                Submit Request <Send className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">Trusted by Teams Worldwide</h2>
                        <p className="text-slate-400">Delivering excellence across industries</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {[
                            { icon: Users, label: '500+ Clients', desc: 'Businesses Served' },
                            { icon: TrendingUp, label: '98% Success', desc: 'Project Completion' },
                            { icon: Lock, label: 'SOC 2 Certified', desc: 'Security Standards' },
                            { icon: Clock, label: '24/7 Support', desc: 'Always Available' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-white mb-1">{stat.label}</div>
                                <div className="text-sm text-slate-500">{stat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-400 text-lg">Everything you need to know</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <FAQItem
                                key={idx}
                                {...faq}
                                isOpen={openFAQ === idx}
                                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join hundreds of companies that trust us with their most critical technology projects.
                        </p>
                        <Button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            variant="primary"
                            className="text-lg"
                        >
                            Submit Your Request
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}