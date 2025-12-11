"use client";

import { useState } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, MapPin, Phone, Clock } from 'lucide-react';

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

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
}

function Button({ children, onClick, type = "button", variant = "primary", className = "", isLoading = false }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white"
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
                    Sending...
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
        <div className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-1">{info}</p>
            {subInfo && <p className="text-slate-500 text-xs">{subInfo}</p>}
        </div>
    );
}

// Contact Form Component
function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    const handleReset = () => {
        setSubmitted(false);
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
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Message Sent Successfully!</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <Button onClick={handleReset} variant="secondary">
                        Send Another Message
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Input
                label="Your Name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
                label="Email Address"
                type="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
                label="Subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    Message <span className="text-blue-400">*</span>
                </label>
                <textarea
                    required
                    rows={6}
                    placeholder="Tell us about your inquiry, project, or how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
            </div>

            <Button
                onClick={handleSubmit}
                variant="primary"
                className="w-full"
                isLoading={loading}
            >
                Send Message <Send className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );
}

// Main Contact Page Component
export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">Get in Touch</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Contact Us
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Have a question or ready to start your project? We're here to help bring your vision to life.
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Let's Talk</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Whether you're looking to build a new product, enhance your existing systems, or need expert consultation, we're ready to help you succeed.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ContactInfoCard
                                icon={Mail}
                                title="Email Us"
                                info="contact@arabshield.com"
                                subInfo="Response within 24 hours"
                            />
                            <ContactInfoCard
                                icon={Phone}
                                title="Call Us"
                                info="+966 5X XXX XXXX"
                                subInfo="Mon-Fri, 9AM-6PM"
                            />
                            <ContactInfoCard
                                icon={MapPin}
                                title="Visit Us"
                                info="Riyadh, Saudi Arabia"
                                subInfo="King Fahd District"
                            />
                            <ContactInfoCard
                                icon={Clock}
                                title="Business Hours"
                                info="Sun-Thu: 9AM-6PM"
                                subInfo="Weekend: Closed"
                            />
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-4">Why Choose ArabShield?</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>Enterprise-grade security and compliance</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>24/7 dedicated support for critical systems</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>Proven track record with 500+ successful projects</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>Cutting-edge technology and best practices</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <Send className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Send us a Message</h3>
                                <p className="text-slate-400 text-sm">We'll respond as soon as possible</p>
                            </div>
                        </div>

                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Map Section (Optional) */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden h-96 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500">Map integration placeholder</p>
                            <p className="text-slate-600 text-sm">King Fahd District, Riyadh, Saudi Arabia</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Let's discuss how we can help transform your business with technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" className="text-lg">
                            Schedule a Call
                        </Button>
                        <Button variant="secondary" className="text-lg">
                            View Our Work
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}