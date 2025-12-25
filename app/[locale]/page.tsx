"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Smartphone, Monitor, Code, Shield, Sparkles, Zap,
  ArrowRight, CheckCircle, TrendingUp, Users, Award,
  Lock, Cpu, Globe, Rocket, Brain, Database, Lightbulb,
  Target, Layers, Play, MessageSquare, Star, ChevronRight,
  Briefcase, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Services - problem-oriented
  const services = [
    {
      icon: Monitor,
      title: locale === 'ar' ? 'تطوير الويب' : 'Web Development',
      problem: locale === 'ar' ? 'موقعك البطيء يخسرك عملاء' : 'Slow websites lose customers',
      solution: locale === 'ar' ? 'نبني مواقع سريعة وقابلة للتوسع' : 'We build fast, scalable web apps',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: locale === 'ar' ? 'تطبيقات الجوال' : 'Mobile Apps',
      problem: locale === 'ar' ? 'عملاؤك على الجوال' : 'Your users are on mobile',
      solution: locale === 'ar' ? 'تطبيقات iOS و Android أنيقة' : 'Beautiful iOS & Android apps',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
      problem: locale === 'ar' ? 'التهديدات الأمنية تتزايد' : 'Security threats are rising',
      solution: locale === 'ar' ? 'حماية شاملة لأنظمتك' : 'Enterprise-grade protection',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Brain,
      title: locale === 'ar' ? 'حلول الذكاء الاصطناعي' : 'AI Solutions',
      problem: locale === 'ar' ? 'المهام اليدوية تستهلك الوقت' : 'Manual tasks waste time',
      solution: locale === 'ar' ? 'أتمتة ذكية لأعمالك' : 'Smart automation for your business',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  // Why choose us - value cards
  const valueProps = [
    {
      icon: Zap,
      title: locale === 'ar' ? 'سرعة التنفيذ' : 'Fast Delivery',
      description: locale === 'ar' ? 'من الفكرة للإطلاق في أسابيع' : 'From idea to launch in weeks',
    },
    {
      icon: Lock,
      title: locale === 'ar' ? 'أمان مطلق' : 'Secure by Design',
      description: locale === 'ar' ? 'حماية على مستوى البنوك' : 'Bank-level security standards',
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'فريق متخصص' : 'Expert Team',
      description: locale === 'ar' ? '+50 مطور محترف' : '50+ certified developers',
    },
    {
      icon: TrendingUp,
      title: locale === 'ar' ? 'نتائج مضمونة' : 'Proven Results',
      description: locale === 'ar' ? '98% رضا العملاء' : '98% client satisfaction',
    },
  ];

  // How we work - 4 steps
  const processSteps = [
    { icon: Lightbulb, title: locale === 'ar' ? 'اكتشاف' : 'Discover', description: locale === 'ar' ? 'نفهم احتياجاتك' : 'We understand your needs' },
    { icon: Target, title: locale === 'ar' ? 'تصميم' : 'Design', description: locale === 'ar' ? 'نرسم الخطة' : 'We craft the solution' },
    { icon: Code, title: locale === 'ar' ? 'بناء' : 'Build', description: locale === 'ar' ? 'ننفذ بدقة' : 'We build with precision' },
    { icon: Rocket, title: locale === 'ar' ? 'توسع' : 'Scale', description: locale === 'ar' ? 'ننمو معك' : 'We grow with you' },
  ];

  // Featured projects
  const projects = [
    {
      title: locale === 'ar' ? 'منصة تجارة إلكترونية' : 'E-Commerce Platform',
      category: locale === 'ar' ? 'تطوير ويب' : 'Web Development',
      outcome: locale === 'ar' ? '+200% في المبيعات' : '+200% sales increase',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      title: locale === 'ar' ? 'تطبيق توصيل' : 'Delivery App',
      category: locale === 'ar' ? 'تطبيقات جوال' : 'Mobile App',
      outcome: locale === 'ar' ? '50 ألف مستخدم' : '50K active users',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: locale === 'ar' ? 'نظام ERP متكامل' : 'Enterprise ERP',
      category: locale === 'ar' ? 'برمجيات مخصصة' : 'Custom Software',
      outcome: locale === 'ar' ? '60% توفير بالوقت' : '60% time saved',
      gradient: 'from-emerald-600 to-teal-600',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: locale === 'ar' ? 'NovaArab حولت فكرتنا لمنتج ناجح في وقت قياسي' : 'NovaArab transformed our idea into a successful product in record time',
      author: locale === 'ar' ? 'أحمد السعود' : 'Ahmed Al-Saud',
      role: locale === 'ar' ? 'مؤسس شركة ناشئة' : 'Startup Founder',
    },
    {
      quote: locale === 'ar' ? 'فريق محترف وتواصل ممتاز طوال المشروع' : 'Professional team with excellent communication throughout',
      author: locale === 'ar' ? 'سارة محمد' : 'Sarah Mohammed',
      role: locale === 'ar' ? 'مديرة منتجات' : 'Product Manager',
    },
    {
      quote: locale === 'ar' ? 'أفضل استثمار قمنا به لتحويل أعمالنا رقمياً' : 'Best investment we made for our digital transformation',
      author: locale === 'ar' ? 'خالد العمري' : 'Khaled Al-Omari',
      role: locale === 'ar' ? 'الرئيس التنفيذي' : 'CEO',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-abyss-950 via-abyss-900 to-abyss-950">

      {/* ========== SECTION 1: HERO (CRITICAL) ========== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]"></div>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-8 text-sm px-4 py-2 border-blue-500/30 text-blue-400 bg-blue-500/5">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              {locale === 'ar' ? 'شريكك التقني الموثوق' : 'Your Trusted Tech Partner'}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            <span className="text-white">
              {locale === 'ar' ? 'نبني منتجات رقمية' : 'We build digital products'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {locale === 'ar' ? 'تحقق النتائج' : 'that drive results'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {locale === 'ar'
              ? 'من الفكرة إلى الإطلاق. نطور حلولاً تقنية متكاملة للشركات الطموحة.'
              : 'From concept to launch. We develop end-to-end tech solutions for ambitious companies.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/contact">
              <Button size="lg" className="min-w-[200px] h-14 text-base font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                {locale === 'ar' ? 'احصل على استشارة مجانية' : 'Get a Free Consultation'}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="min-w-[200px] h-14 text-base font-semibold border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300">
                {locale === 'ar' ? 'شاهد أعمالنا' : 'View Our Work'}
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>{locale === 'ar' ? '+100 مشروع ناجح' : '100+ Successful Projects'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>{locale === 'ar' ? '98% رضا العملاء' : '98% Client Satisfaction'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>{locale === 'ar' ? 'دعم 24/7' : '24/7 Support'}</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ========== SECTION 2: WHY NOVAARAB ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose NovaArab?'}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {locale === 'ar' ? 'نجمع بين الخبرة التقنية والفهم العميق لاحتياجات السوق' : 'We combine technical expertise with deep market understanding'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <prop.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{prop.title}</h3>
                <p className="text-sm text-gray-400">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: SERVICES PREVIEW ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/5">
              {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'حلول تقنية شاملة' : 'Complete Tech Solutions'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href="/services" className="block group">
                  <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{service.problem}</p>
                        <p className="text-sm text-gray-300">{service.solution}</p>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/services">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                {locale === 'ar' ? 'استكشف جميع الخدمات' : 'Explore All Services'}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 4: VISUAL BREAK / STATEMENT ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-purple-950/30 to-blue-950/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-8">
            <Briefcase className="h-8 w-8 text-blue-400" />
          </div>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-6">
            {locale === 'ar'
              ? '"نحول التحديات التقنية إلى فرص نمو لعملك"'
              : '"We turn technical challenges into growth opportunities for your business"'}
          </blockquote>
          <p className="text-gray-400">
            {locale === 'ar' ? '+100 شركة تثق بنا في رحلتها الرقمية' : '100+ companies trust us for their digital journey'}
          </p>
        </motion.div>
      </section>

      {/* ========== SECTION 5: PORTFOLIO PREVIEW ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/5">
              {locale === 'ar' ? 'أعمالنا' : 'Our Work'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'مشاريع ناجحة' : 'Featured Projects'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-xs font-medium text-white/70 mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <BarChart3 className="h-4 w-4" />
                    <span>{project.outcome}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/portfolio">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                {locale === 'ar' ? 'شاهد جميع المشاريع' : 'See Full Portfolio'}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 6: HOW WE WORK ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'كيف نعمل' : 'How We Work'}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {locale === 'ar' ? 'منهجية مجربة تضمن نجاح مشروعك' : "A proven methodology that ensures your project's success"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center group"
              >
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className={`hidden md:block absolute top-10 ${isRTL ? 'right-full' : 'left-full'} w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent`}></div>
                )}

                {/* Step number */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] mb-4 group-hover:border-blue-500/30 transition-colors duration-300">
                  <step.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: TESTIMONIALS ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: FINAL CTA ========== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-purple-950/30 to-blue-950/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {locale === 'ar' ? 'جاهز لبناء شيء جاد؟' : 'Ready to build something serious?'}
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            {locale === 'ar'
              ? 'ابدأ مشروعك مع فريق يفهم طموحاتك ويملك الخبرة لتحقيقها'
              : 'Start your project with a team that understands your ambitions and has the expertise to deliver'}
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-14 px-10 text-base font-semibold bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-300">
              {locale === 'ar' ? 'لنتحدث' : "Let's Talk"}
              <MessageSquare className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
