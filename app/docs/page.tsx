"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Search, BookOpen, Code, Sparkles, Rocket, ArrowRight,
    FileText, Clock, ChevronRight, ExternalLink
} from 'lucide-react';
import { docCategories, docArticles, getArticlesByCategory, DocArticle } from '@/lib/docsData';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
    Rocket,
    BookOpen,
    Code,
    Sparkles,
};

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Filter articles based on search
    const filteredArticles = searchQuery
        ? docArticles.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">150+ مقالة تعليمية</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        التوثيق
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                        كل ما تحتاج معرفته لبناء تطبيقات احترافية مع NovaArab. أدلة شاملة ومراجع API ومواضيع متقدمة.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="ابحث في التوثيق..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>

                    {/* Search Results */}
                    {searchQuery && filteredArticles.length > 0 && (
                        <div className="max-w-2xl mx-auto mt-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-right">
                            <div className="max-h-80 overflow-y-auto">
                                {filteredArticles.slice(0, 10).map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/docs/${article.category}/${article.slug}`}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
                                    >
                                        <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-medium text-white">{article.title}</p>
                                            <p className="text-sm text-slate-500">{article.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-600" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/tutorials" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span>دروس الفيديو</span>
                    </Link>
                    <Link href="/issues" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors">
                        <FileText className="w-5 h-5 text-yellow-400" />
                        <span>المشاكل الشائعة</span>
                    </Link>
                    <a href="https://github.com/NovaArab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors">
                        <ExternalLink className="w-5 h-5 text-slate-400" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-8 text-center">استكشف بالفئة</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docCategories.map((category) => {
                        const Icon = iconMap[category.icon] || BookOpen;
                        const articles = getArticlesByCategory(category.id);

                        return (
                            <div
                                key={category.id}
                                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="w-7 h-7 text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{category.description}</p>
                                        <p className="text-xs text-slate-500">{category.articleCount} مقالة</p>
                                    </div>
                                </div>

                                {/* Preview articles */}
                                <div className="mt-6 space-y-2">
                                    {articles.slice(0, 3).map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/docs/${category.id}/${article.slug}`}
                                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                            <span>{article.title}</span>
                                        </Link>
                                    ))}
                                </div>

                                <Link
                                    href={`/docs/${category.id}`}
                                    className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                                >
                                    <span>عرض الكل</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Popular Articles */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">المقالات الشائعة</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {docArticles.slice(0, 6).map((article) => (
                            <Link
                                key={article.id}
                                href={`/docs/${article.category}/${article.slug}`}
                                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all"
                            >
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                    <Clock className="w-4 h-4" />
                                    <span>{article.readTime} دقائق قراءة</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-slate-400">{article.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
                    <p className="text-slate-400 mb-8">فريق الدعم لدينا جاهز لمساعدتك</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/support"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/30 transition-all"
                        >
                            تواصل مع الدعم
                        </Link>
                        <Link
                            href="/issues"
                            className="px-8 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all"
                        >
                            المشاكل الشائعة
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
