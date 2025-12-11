"use client";

import Link from 'next/link';
import { Shield, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-abyss-950 via-abyss-900 to-abyss-950 text-slate-300 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 pb-16 border-b border-white/10"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
                        <p className="text-slate-400 mb-8">Get the latest cybersecurity insights and updates delivered to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:border-electric-500"
                            />
                            <Button variant="primary" size="md" className="sm:w-auto">
                                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="bg-gradient-to-br from-electric-600 to-cyan-500 p-2 rounded-xl shadow-lg shadow-electric-500/30">
                                <Shield className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">NovaArabia</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                            Empowering businesses with cutting-edge digital solutions. From custom software to mobile apps, we build the future of technology in the Arab world.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-electric-500 transition-all hover:scale-110">
                                <Facebook size={18} />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-electric-500 transition-all hover:scale-110">
                                <Twitter size={18} />
                            </a>
                            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-electric-500 transition-all hover:scale-110">
                                <Instagram size={18} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-electric-500 transition-all hover:scale-110">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />About Us</Link></li>
                            <li><Link href="/services" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Our Services</Link></li>
                            <li><Link href="/pricing" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Pricing Plans</Link></li>
                            <li><Link href="/careers" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Careers</Link></li>
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
                        <ul className="space-y-4">
                            <li><Link href="/support" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Support Center</Link></li>
                            <li><Link href="/faq" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />FAQs</Link></li>
                            <li><Link href="/privacy-policy" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-slate-400 hover:text-electric-500 transition-colors flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />Terms of Service</Link></li>
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-lg font-semibold text-white mb-6">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 group">
                                <MapPin size={18} className="text-electric-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-400 text-sm">123 Tech District, Innovation Blvd, Riyadh 11564, Saudi Arabia</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <Mail size={18} className="text-electric-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:hello@novarabia.com" className="text-slate-400 hover:text-white transition-colors text-sm">hello@novarabia.com</a>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <Phone size={18} className="text-electric-500 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-400 text-sm">+966 11 234 5678</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} NovaArabia. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex items-center space-x-6">
                        <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
