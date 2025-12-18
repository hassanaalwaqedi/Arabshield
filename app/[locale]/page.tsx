"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Smartphone, Monitor, Code, Shield, Sparkles, Zap,
  ArrowRight, CheckCircle, TrendingUp, Users, Award,
  Lock, Cpu, Globe, Rocket, Brain, Database
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Dynamic services based on locale
  const services = [
    {
      icon: Monitor,
      title: t('services.webDev.title'),
      description: t('services.webDev.description'),
      gradient: 'from-electric-500 to-neon-600',
      features: ['Next.js & React', locale === 'ar' ? 'البنية السحابية' : 'Cloud Architecture', locale === 'ar' ? 'الميزات الفورية' : 'Real-time Features']
    },
    {
      icon: Smartphone,
      title: t('services.mobileDev.title'),
      description: t('services.mobileDev.description'),
      gradient: 'from-purple-500 to-magenta-600',
      features: ['iOS & Android', 'React Native', 'Flutter']
    },
    {
      icon: Shield,
      title: t('services.security.title'),
      description: t('services.security.description'),
      gradient: 'from-cyber-500 to-matrix-600',
      features: [locale === 'ar' ? 'اختبار الاختراق' : 'Penetration Testing', locale === 'ar' ? 'التدقيق الأمني' : 'Security Audit', locale === 'ar' ? 'المراقبة 24/7' : '24/7 Monitoring']
    },
    {
      icon: Brain,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      gradient: 'from-volt-500 to-holo-600',
      features: [locale === 'ar' ? 'التعلم الآلي' : 'Machine Learning', 'NLP & Vision', locale === 'ar' ? 'الأتمتة' : 'Automation']
    }
  ];

  const stats = [
    { value: '100+', label: t('stats.projects'), icon: Rocket },
    { value: '98%', label: t('stats.satisfaction'), icon: Award },
    { value: '24/7', label: t('stats.support'), icon: Users },
    { value: '99.9%', label: t('stats.uptime'), icon: TrendingUp },
  ];

  const features = [
    { icon: Zap, title: t('whyUs.speed.title'), description: t('whyUs.speed.description') },
    { icon: Lock, title: t('whyUs.security.title'), description: t('whyUs.security.description') },
    { icon: Cpu, title: t('whyUs.ai.title'), description: t('whyUs.ai.description') },
    { icon: Globe, title: t('whyUs.global.title'), description: t('whyUs.global.description') },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-abyss-950 via-abyss-900 to-abyss-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-electric-500/20 rounded-full blur-6xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-500/20 rounded-full blur-6xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-6xl animate-pulse-slow"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="electric" className="mb-8 text-sm px-4 py-2 shadow-glow animate-glow-pulse">
              <Sparkles className="h-3 w-3 mr-2" />
              {t('hero.trustedBy')}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-electric-200 to-neon-300 bg-clip-text text-transparent animate-text-shimmer bg-300">
              {t('hero.title')}
            </span>
            <br />
            <span className="text-white">{t('hero.titleHighlight')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-abyss-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/order">
              <Button variant="glow" size="lg" className="group">
                {t('hero.startProject')}
                <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:translate-x-1 transition-transform`} />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                {t('hero.exploreServices')}
              </Button>
            </Link>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-dark p-6 rounded-2xl backdrop-blur-2xl border border-white/10 hover:border-electric-500/50 transition-all duration-300 group"
              >
                <stat.icon className="h-8 w-8 text-electric-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-abyss-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* AI Solutions Strip */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-indigo-900/50 border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              <span>{locale === 'ar' ? 'جديد: حلول الذكاء الاصطناعي للمؤسسات' : 'New: Enterprise AI Solutions'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {locale === 'ar' ? 'أطلق العنان لقوة الذكاء الاصطناعي' : 'Unleash the Power of AI'}
            </h2>
            <p className="text-indigo-200 text-lg max-w-xl">
              {locale === 'ar' ? 'انشر نماذج ذكاء اصطناعي مخصصة وروبوتات محادثة وتحليلات تنبؤية لتحويل عملك.' : 'Deploy custom AI models, chatbots, and predictive analytics to transform your business.'}
            </p>
          </div>

          <Link href="/ai-solutions">
            <Button variant="glow" size="lg" className="whitespace-nowrap shadow-purple-500/30">
              {locale === 'ar' ? 'استكشف حلول الذكاء الاصطناعي' : 'Explore AI Solutions'}
              <Sparkles className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-950/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-6 border-electric-500/30 text-electric-400">
              {locale === 'ar' ? 'خبرتنا' : 'Our Expertise'}
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('services.title')}
            </h2>
            <p className="text-xl text-abyss-400 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover glow="electric" className="h-full bg-abyss-900/50 backdrop-blur-xl border-white/10 group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-3 mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <service.icon className="h-full w-full text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white mb-3">{service.title}</CardTitle>
                    <CardDescription className="text-abyss-400 text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, i) => (
                        <Badge key={i} variant="ghost" className="text-xs bg-white/5 text-abyss-300 border-white/10">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Link href="/services" className="inline-flex items-center text-electric-400 hover:text-electric-300 font-semibold group/link">
                      {t('common.learnMore')}
                      <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4 group-hover/link:translate-x-1 transition-transform`} />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-abyss-950 to-abyss-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('whyUs.title')}
            </h2>
            <p className="text-xl text-abyss-400 max-w-2xl mx-auto">
              {t('whyUs.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-dark p-8 rounded-3xl backdrop-blur-2xl border border-white/10 hover:border-electric-500/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-electric-500 to-neon-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-abyss-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-950/50 via-purple-950/50 to-neon-950/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-6xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-500/20 rounded-full blur-6xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-abyss-300 mb-12 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order">
              <Button variant="glow" size="lg" className="group">
                {t('cta.startToday')}
                <Rocket className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:translate-y-[-2px] transition-transform`} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                {t('cta.talkToExpert')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
