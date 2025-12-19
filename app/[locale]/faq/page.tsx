import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/FAQAccordion';
import { HelpCircle, MessageCircle, Mail, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'الأسئلة الشائعة | NovaArab',
    description: 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا وعملياتنا وأسعارنا.',
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Enhanced Hero Section */}
            <div className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">مركز المساعدة</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        الأسئلة الشائعة
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                        لديك أسئلة؟ لدينا الإجابات. إذا لم تجد ما تبحث عنه، لا تتردد في الاتصال بنا.
                    </p>

                    {/* Quick Action Cards */}
                    <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                        <a href="/support" className="group flex items-center gap-2 px-5 py-3 bg-card/80 border border-border rounded-2xl hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/20 backdrop-blur-sm">
                            <MessageCircle className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-slate-300 group-hover:text-foreground">دردشة مباشرة</span>
                        </a>
                        <a href="/contact" className="group flex items-center gap-2 px-5 py-3 bg-card/80 border border-border rounded-2xl hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 backdrop-blur-sm">
                            <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-slate-300 group-hover:text-foreground">اتصل بنا</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* FAQ Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300 font-medium">الأسئلة الأكثر شيوعاً</span>
                    </div>
                </div>

                {/* FAQ Accordion with Enhanced Container */}
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                    <FAQAccordion />
                </div>

                {/* Still Have Questions CTA */}
                <div className="mt-16 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12 text-center backdrop-blur-sm">
                    <h3 className="text-3xl font-bold mb-4">لا تزال لديك أسئلة؟</h3>
                    <p className="text-muted-foreground text-lg mb-8">فريق الدعم لدينا متاح على مدار الساعة لمساعدتك</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/support" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-foreground rounded-2xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40">
                            <MessageCircle className="w-5 h-5" />
                            <span>ابدأ محادثة</span>
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted border-2 border-border text-foreground rounded-2xl font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all">
                            <Mail className="w-5 h-5" />
                            <span>أرسل لنا رسالة</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
