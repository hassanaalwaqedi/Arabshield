"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, Mail, MessageSquare, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
                className={`w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${className}`}
            />
        </div>
    );
}

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
}

function Button({ children, onClick, type = "button", variant = "primary", className = "", isLoading = false, loadingText }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-foreground shadow-lg shadow-blue-600/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-foreground"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`inline-flex items-center justify-center px-8 h-14 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingText}
                </>
            ) : children}
        </button>
    );
}

// Contact Info Card Component
interface ContactInfoCardProps {
    icon: React.ElementType;
    title: string;
    info: string;
    subInfo?: string;
}

function ContactInfoCard({ icon: Icon, title, info, subInfo }: ContactInfoCardProps) {
    return (
        <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-border transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-foreground font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-1">{info}</p>
            {subInfo && <p className="text-muted-foreground text-xs">{subInfo}</p>}
        </div>
    );
}

// Contact Form Component
function ContactForm({ t }: { t: ReturnType<typeof useTranslations> }) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            setError(t('form.errorRequired'));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Save to Firestore
            await addDoc(collection(db, 'contact_messages'), {
                name: formData.name,
                email: formData.email,
                subject: formData.subject || null,
                message: formData.message,
                status: 'unread',
                createdAt: serverTimestamp(),
            });

            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting contact form:', err);
            setError(t('form.errorSubmit'));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setError(null);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    if (submitted) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                        <CheckCircle className="w-10 h-10 text-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-3">{t('form.successTitle')}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        {t('form.successMessage')}
                    </p>
                    <Button onClick={handleReset} variant="secondary">
                        {t('form.sendAnother')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Input
                label={t('form.nameLabel')}
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
                label={t('form.emailLabel')}
                type="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
                label={t('form.subjectLabel')}
                placeholder={t('form.subjectPlaceholder')}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    {t('form.messageLabel')} <span className="text-blue-400">*</span>
                </label>
                <textarea
                    required
                    rows={6}
                    placeholder={t('form.messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full"
                isLoading={loading}
                loadingText={t('form.sending')}
            >
                {t('form.submit')} <Send className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );
}

// Main Contact Page Component
export default function ContactPage() {
    const t = useTranslations('contact');

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">{t('badge')}</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{t('letsTalk')}</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {t('description')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ContactInfoCard
                                icon={Mail}
                                title={t('info.email.title')}
                                info="hello@NovaArab.com"
                                subInfo={t('info.email.subInfo')}
                            />
                            <ContactInfoCard
                                icon={Phone}
                                title={t('info.phone.title')}
                                info="+90 537 280 71 33"
                                subInfo={t('info.phone.subInfo')}
                            />
                            <ContactInfoCard
                                icon={MapPin}
                                title={t('info.location.title')}
                                info={t('info.location.address')}
                                subInfo={t('info.location.subInfo')}
                            />
                            <ContactInfoCard
                                icon={Clock}
                                title={t('info.hours.title')}
                                info={t('info.hours.weekdays')}
                                subInfo={t('info.hours.weekend')}
                            />
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-4">{t('whyChooseUs.title')}</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>{t('whyChooseUs.security')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>{t('whyChooseUs.support')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>{t('whyChooseUs.projects')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>{t('whyChooseUs.technology')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <Send className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">{t('form.title')}</h3>
                                <p className="text-muted-foreground text-sm">{t('form.subtitle')}</p>
                            </div>
                        </div>

                        <ContactForm t={t} />
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">{t('map.title')}</h2>
                        <p className="text-muted-foreground">{t('map.location')}</p>
                    </div>
                    <div className="bg-card border border-border rounded-3xl overflow-hidden h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7392665913313!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1702743000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="NovaArab Location"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        {t('cta.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/order"
                            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-foreground shadow-lg shadow-blue-600/30 transition-all"
                        >
                            {t('cta.startProject')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl font-semibold text-lg bg-slate-700 hover:bg-slate-600 text-foreground transition-all"
                        >
                            {t('cta.viewWork')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}