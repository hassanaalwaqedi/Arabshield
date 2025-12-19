"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Search, AlertCircle, CheckCircle, ChevronRight, ArrowRight,
    BookOpen, Play, Lock, CreditCard, Zap, FileText, Mail, Code, Rocket,
    ChevronDown
} from 'lucide-react';
import { commonIssues, issueCategories, getIssuesByCategory, CommonIssue } from '@/lib/docsData';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
    Lock,
    CreditCard,
    Zap,
    FileText,
    Mail,
    Code,
    Rocket,
};

export default function IssuesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

    // Filter issues
    const filteredIssues = commonIssues.filter(issue => {
        const matchesSearch = !searchQuery ||
            issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !activeCategory || issue.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-orange-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-300 font-medium">80 مشكلة شائعة</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-slate-400 bg-clip-text text-transparent">
                        المشاكل الشائعة
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                        حلول سريعة للمشاكل المتكررة. ابحث عن مشكلتك واحصل على الحل فوراً.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="صف مشكلتك..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-card/80 backdrop-blur-sm border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${!activeCategory
                                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-foreground shadow-lg'
                                : 'bg-card border border-border text-muted-foreground hover:border-border'
                            }`}
                    >
                        الكل ({commonIssues.length})
                    </button>
                    {issueCategories.map((cat) => {
                        const Icon = iconMap[cat.icon] || AlertCircle;
                        const count = getIssuesByCategory(cat.id).length;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeCategory === cat.id
                                        ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-foreground shadow-lg'
                                        : 'bg-card border border-border text-muted-foreground hover:border-border'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{cat.title} ({count})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Quick Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/docs" className="inline-flex items-center gap-2 px-5 py-2 bg-card border border-border rounded-lg hover:border-yellow-500/50 transition-colors text-sm">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>التوثيق</span>
                    </Link>
                    <Link href="/tutorials" className="inline-flex items-center gap-2 px-5 py-2 bg-card border border-border rounded-lg hover:border-yellow-500/50 transition-colors text-sm">
                        <Play className="w-4 h-4 text-purple-400" />
                        <span>دروس الفيديو</span>
                    </Link>
                </div>
            </div>

            {/* Issues List */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredIssues.length === 0 ? (
                    <div className="text-center py-16 bg-card/50 rounded-2xl border border-border">
                        <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg">لا توجد نتائج</p>
                        <p className="text-muted-foreground text-sm mt-2">جرب البحث بكلمات مختلفة</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredIssues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                                isExpanded={expandedIssue === issue.id}
                                onToggle={() => setExpandedIssue(
                                    expandedIssue === issue.id ? null : issue.id
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="border-t border-border mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">لم تجد حلاً لمشكلتك؟</h2>
                    <p className="text-muted-foreground mb-8">فريق الدعم الفني جاهز لمساعدتك</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/dashboard/support"
                            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-foreground rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                            إرسال تذكرة دعم
                        </Link>
                        <Link
                            href="/support"
                            className="px-8 py-4 bg-muted text-foreground rounded-xl font-semibold hover:bg-slate-700 transition-all"
                        >
                            مركز الدعم
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Issue Card Component
function IssueCard({
    issue,
    isExpanded,
    onToggle
}: {
    issue: CommonIssue;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all">
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1 text-right">
                        <h3 className="font-bold text-foreground mb-1">{issue.title}</h3>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mr-4 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Expanded Content */}
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="px-6 pb-6 border-t border-border">
                    {/* Causes */}
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">الأسباب المحتملة:</h4>
                        <ul className="space-y-1">
                            {issue.causes.map((cause, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="text-yellow-400 mt-1">•</span>
                                    <span>{cause}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solution */}
                    <div className="mt-6">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">الحل:</h4>
                        <div className="bg-muted/50 rounded-xl p-4">
                            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                                {issue.solution}
                            </pre>
                        </div>
                    </div>

                    {/* Related Links */}
                    {(issue.relatedDocs.length > 0 || issue.relatedVideos.length > 0) && (
                        <div className="mt-6 flex flex-wrap gap-3">
                            {issue.relatedDocs.length > 0 && (
                                <Link
                                    href="/docs"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400 hover:bg-blue-500/20 transition-colors"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>مقالات ذات صلة</span>
                                </Link>
                            )}
                            {issue.relatedVideos.length > 0 && (
                                <Link
                                    href="/tutorials"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-400 hover:bg-purple-500/20 transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    <span>فيديوهات ذات صلة</span>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Helpful? */}
                    <div className="mt-6 pt-4 border-t border-border flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">هل كان هذا مفيداً؟</span>
                        <button className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400 hover:bg-green-500/20 transition-colors">
                            نعم ✓
                        </button>
                        <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/20 transition-colors">
                            لا ✗
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
