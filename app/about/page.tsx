"use client";

import { Shield, Target, Users, Award, Zap, TrendingUp, Globe, Heart, Code, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';

// Stat Card Component
interface StatCardProps {
    number: string;
    label: string;
    description: string;
}

function StatCard({ number, label, description }: StatCardProps) {
    return (
        <div className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 text-center">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                {number}
            </h3>
            <p className="text-white font-semibold mb-2">{label}</p>
            <p className="text-slate-500 text-sm">{description}</p>
        </div>
    );
}

// Value Card Component
interface ValueCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
    return (
        <div className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                <Icon className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}

// Team Value Component
interface TeamValueProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

function TeamValue({ icon: Icon, title, description }: TeamValueProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

// Timeline Item Component
interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    isLast?: boolean;
}

function TimelineItem({ year, title, description, isLast }: TimelineItemProps) {
    return (
        <div className="relative pl-8 pb-12">
            {!isLast && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
            )}
            <div className="absolute left-0 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-950 shadow-lg shadow-blue-500/50"></div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                <div className="text-blue-400 font-bold text-sm mb-2">{year}</div>
                <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
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
        <button className={`inline-flex items-center justify-center px-8 h-12 rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}

// Main About Page Component
export default function AboutPage() {
    const stats = [
        { number: '5+', label: 'Years Experience', description: 'In the industry' },
        { number: '500+', label: 'Projects Delivered', description: 'Successfully completed' },
        { number: '98%', label: 'Client Satisfaction', description: 'Happy customers' },
        { number: '24/7', label: 'Support Available', description: 'Always here for you' }
    ];

    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To empower businesses with innovative technology solutions that drive sustainable growth, efficiency, and competitive advantage in the digital age.'
        },
        {
            icon: Shield,
            title: 'Our Vision',
            description: 'To be the leading technology partner in the Middle East, recognized globally for uncompromising quality, integrity, and transformative digital solutions.'
        },
        {
            icon: Users,
            title: 'Our Values',
            description: 'Client-centricity, technical excellence, transparency, continuous learning, and ethical practices define who we are and guide every decision we make.'
        }
    ];

    const teamValues = [
        {
            icon: Heart,
            title: 'Passion-Driven',
            description: 'We love what we do and it shows in every line of code and every client interaction.'
        },
        {
            icon: Code,
            title: 'Technical Excellence',
            description: 'We stay at the forefront of technology, continuously learning and adapting to new tools and methodologies.'
        },
        {
            icon: Lightbulb,
            title: 'Innovation First',
            description: 'We challenge the status quo and seek creative solutions to complex problems.'
        },
        {
            icon: CheckCircle,
            title: 'Quality Obsessed',
            description: 'We take pride in delivering work that exceeds expectations and stands the test of time.'
        }
    ];

    const timeline = [
        {
            year: '2019',
            title: 'Company Founded',
            description: 'ArabShield was established with a mission to bridge the technology gap in the Middle East.'
        },
        {
            year: '2020',
            title: 'First Major Project',
            description: 'Delivered our first enterprise solution, setting the standard for quality and innovation.'
        },
        {
            year: '2021',
            title: 'Team Expansion',
            description: 'Grew our team to 20+ specialists covering all aspects of modern software development.'
        },
        {
            year: '2022',
            title: 'International Recognition',
            description: 'Received industry awards and established partnerships with global technology leaders.'
        },
        {
            year: '2023',
            title: 'AI Integration',
            description: 'Launched our AI and machine learning division, helping clients leverage cutting-edge technology.'
        },
        {
            year: '2024',
            title: 'Continued Growth',
            description: '500+ successful projects, expanding services and maintaining 98% client satisfaction rate.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">Est. 2019</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        About ArabShield
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        We are a team of innovators, developers, and strategists dedicated to building the future of technology in the Arab world and beyond.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                            <Globe className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-300 font-medium">Our Journey</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed text-lg">
                            Founded with a vision to bridge the gap between traditional business and modern technology, ArabShield has grown into a premier technology partner for companies across the region.
                        </p>
                        <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                            We believe in the power of digital transformation to solve complex problems and create new opportunities. Our journey is defined by a relentless pursuit of excellence and a commitment to our clients' success.
                        </p>
                        <Button variant="primary">
                            Start Your Project <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {teamValues.map((value, idx) => (
                            <TeamValue key={idx} {...value} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Drives Us</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Our mission, vision, and values guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <ValueCard key={idx} {...value} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
                        <p className="text-slate-400 text-lg">
                            Milestones that shaped who we are today
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {timeline.map((item, idx) => (
                            <TimelineItem
                                key={idx}
                                {...item}
                                isLast={idx === timeline.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose ArabShield?</h2>
                        <p className="text-slate-400 text-lg">
                            We combine expertise, passion, and innovation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: 'Fast Delivery', desc: 'Agile methodologies ensure quick turnaround without compromising quality' },
                            { icon: Shield, title: 'Secure & Compliant', desc: 'Industry-leading security practices and compliance standards' },
                            { icon: TrendingUp, title: 'Scalable Solutions', desc: 'Built to grow with your business needs' },
                            { icon: Users, title: 'Dedicated Support', desc: '24/7 technical support and account management' },
                            { icon: Award, title: 'Proven Track Record', desc: '500+ successful projects across various industries' },
                            { icon: Lightbulb, title: 'Innovation Focus', desc: 'Cutting-edge technology and creative problem-solving' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work Together?</h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join hundreds of companies that trust us with their most important technology projects.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" className="text-lg">
                                Start a Project
                            </Button>
                            <Button variant="outline" className="text-lg">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}