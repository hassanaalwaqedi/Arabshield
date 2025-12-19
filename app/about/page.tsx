"use client";

import Image from 'next/image';
import { Shield, Target, Users, Award, Zap, TrendingUp, Globe, Heart, Code, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';

// Stat Card Component
interface StatCardProps {
    number: string;
    label: string;
    description: string;
}

function StatCard({ number, label, description }: StatCardProps) {
    return (
        <div className="group p-8 rounded-2xl bg-card border border-border hover:border-border transition-all duration-300 text-center">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                {number}
            </h3>
            <p className="text-foreground font-semibold mb-2">{label}</p>
            <p className="text-muted-foreground text-sm">{description}</p>
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
        <div className="group p-8 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                <Icon className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
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
                <h4 className="text-foreground font-semibold mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
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
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-border transition-all">
                <div className="text-blue-400 font-bold text-sm mb-2">{year}</div>
                <h4 className="text-foreground font-bold text-lg mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
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
        primary: "bg-blue-600 hover:bg-blue-500 text-foreground shadow-lg shadow-blue-600/30",
        outline: "bg-transparent border-2 border-border hover:border-border text-foreground"
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
        { number: '2+', label: 'سنوات من الخبرة', description: 'في هذا المجال' },
        { number: '100+', label: 'مشروع منجز', description: 'أُكمل بنجاح' },
        { number: '96%', label: 'رضا العملاء', description: 'عملاء سعداء' },
        { number: '24/7', label: 'الدعم المتاح', description: 'دائماً هنا من أجلك' }
    ];

    const values = [
        {
            icon: Target,
            title: 'مهمتنا',
            description: 'تمكين الشركات بحلول تقنية مبتكرة تحقق النمو المستدام والكفاءة والميزة التنافسية في العصر الرقمي.'
        },
        {
            icon: Shield,
            title: 'رؤيتنا',
            description: 'أن نكون الشريك التقني الرائد في الشرق الأوسط، معترف به عالمياً بالجودة والنزاهة والحلول الرقمية التحويلية.'
        },
        {
            icon: Users,
            title: 'قيمنا',
            description: 'التركيز على العميل، التميز التقني، الشفافية، التعلم المستمر، والممارسات الأخلاقية تحدد هويتنا وتوجه كل قرار نتخذه.'
        }
    ];

    const teamValues = [
        {
            icon: Heart,
            title: 'شغف يقودنا',
            description: 'نحب ما نفعله ويظهر ذلك في كل سطر كود وكل تفاعل مع العميل.'
        },
        {
            icon: Code,
            title: 'التميز التقني',
            description: 'نبقى في طليعة التكنولوجيا، نتعلم ونتكيف باستمرار مع الأدوات والمنهجيات الجديدة.'
        },
        {
            icon: Lightbulb,
            title: 'الابتكار أولاً',
            description: 'نتحدى الوضع الراهن ونسعى لحلول إبداعية للمشاكل المعقدة.'
        },
        {
            icon: CheckCircle,
            title: 'هوس بالجودة',
            description: 'نفخر بتقديم عمل يتجاوز التوقعات ويصمد أمام اختبار الزمن.'
        }
    ];

    const timeline = [
        {
            year: '2022',
            title: 'تأسيس الشركة',
            description: 'تأسست NovaArab بمهمة سد الفجوة التقنية في الشرق الأوسط.'
        },
        {
            year: '2022',
            title: 'أول مشروع كبير',
            description: 'قدمنا أول حل مؤسسي لنا، حددنا معيار الجودة والابتكار.'
        },
        {
            year: '2025',
            title: 'توسع الفريق',
            description: 'نما فريقنا إلى أكثر من 12  متخصصاً يغطون جميع جوانب تطوير البرمجيات الحديثة.'
        },
        {
            year: '2025',
            title: 'اعتراف ',
            description: 'حصلنا على جوائز الصناعة وأقمنا شراكات مع قادة التكنولوجيا العالميين.'
        },
        {
            year: '2024',
            title: 'دمج الذكاء الاصطناعي',
            description: 'أطلقنا قسم الذكاء الاصطناعي والتعلم الآلي، نساعد العملاء على الاستفادة من التكنولوجيا المتطورة.'
        },
        {
            year: '2024',
            title: 'النمو المستمر',
            description: 'أكثر من 500 مشروع ناجح، توسيع الخدمات والمحافظة على معدل رضا عملاء 98%.'
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">تأسست 2023</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        عن NovaArab
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        نحن فريق من المبتكرين والمطورين والاستراتيجيين المكرسون لبناء مستقبل التكنولوجيا في العالم العربي وخارجه.
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

            {/* Founder & CEO Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 border border-border rounded-3xl p-12 md:p-16 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Profile Image */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                                    <Image
                                        src="/NovaArab/public/hassan.jpeg"
                                        width={200}
                                        height={200}
                                        alt="Hassan CEO"
                                        className="rounded-full shadow-2xl border-4 border-border relative z-10"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center lg:text-right">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                                    <Award className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-blue-300 font-medium">المؤسس والرئيس التنفيذي</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                    حسان
                                </h2>

                                <p className="text-xl text-blue-400 font-semibold mb-6">
                                    الرئيس التنفيذي (CEO) لشركة NovaArab
                                </p>

                                <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                                    <p>
                                        بصفتي مؤسس ورئيس تنفيذي لشركة NovaArab، 2022 أقود رؤية واضحة: تمكين الشركات في العالم العربي من خلال الحلول التقنية المبتكرة والمتطورة. منذ تأسيس الشركة في عام، كانت مهمتنا هي سد الفجوة بين الطموحات التجارية والواقع التكنولوجي.
                                    </p>
                                    <p>
                                        نؤمن بأن التحول الرقمي ليس مجرد ترف، بل ضرورة استراتيجية. من خلال فريقنا المتخصص والتزامنا بالتميز، نساعد عملاءنا على تحقيق أهدافهم الرقمية بحلول مصممة خصيصاً لتلبية احتياجاتهم الفريدة. رحلتنا مستمرة، ونحن ملتزمون بالبقاء في طليعة الابتكار التكنولوجي.
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-end">
                                    <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                        <span className="text-blue-400 font-semibold">رؤية استراتيجية</span>
                                    </div>
                                    <div className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                        <span className="text-purple-400 font-semibold">قيادة تقنية</span>
                                    </div>
                                    <div className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                        <span className="text-cyan-400 font-semibold">ابتكار مستمر</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                            <Globe className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-300 font-medium">رحلتنا</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-6">قصتنا</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            تأسست برؤية لسد الفجوة بين الأعمال التقليدية والتكنولوجيا الحديثة، نمت NovaArab لتصبح شريكاً تقنياً رئيسياً للشركات في المنطقة.
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                            نؤمن بقوة التحول الرقمي لحل المشاكل المعقدة وخلق فرص جديدة. رحلتنا محددة بسعي لا هوادة فيه للتميز والتزام بنجاح عملائنا.
                        </p>
                        <Button variant="primary">
                            ابدأ مشروعك <ArrowRight className="ml-2 w-4 h-4" />
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
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">ما يحركنا</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            مهمتنا ورؤيتنا وقيمنا توجه كل ما نفعله
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
            <div className="border-t border-border">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">رحلتنا</h2>
                        <p className="text-muted-foreground text-lg">
                            المعالم التي شكلت هويتنا اليوم
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
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">لماذا تختار NovaArab؟</h2>
                        <p className="text-muted-foreground text-lg">
                            نجمع الخبرة والشغف والابتكار
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: 'تسليم سريع', desc: 'منهجيات رشيقة تضمن سرعة التسليم دون المساس بالجودة' },
                            { icon: Shield, title: 'آمن ومتوافق', desc: 'ممارسات أمنية رائدة في الصناعة ومعايير امتثال' },
                            { icon: TrendingUp, title: 'حلول قابلة للتوسع', desc: 'مبنية للنمو مع احتياجات عملك' },
                            { icon: Users, title: 'دعم مخصص', desc: 'دعم تقني وإدارة حسابات 24/7' },
                            { icon: Award, title: 'سجل مثبت', desc: 'أكثر من 100 مشروع ناجح في صناعات متنوعة' },
                            { icon: Lightbulb, title: 'التركيز على الابتكار', desc: 'تكنولوجيا متطورة وحل إبداعي للمشاكل' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-card/50 border border-border hover:border-border transition-all">
                                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت مستعد للعمل معاً؟</h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            انضم إلى مئات الشركات التي تثق بنا في مشاريعها التقنية الأكثر أهمية.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" className="text-lg">
                                ابدأ مشروعاً
                            </Button>
                            <Button variant="outline" className="text-lg">
                                تواصل معنا
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

