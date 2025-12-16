"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Search, Play, Clock, ArrowRight, ExternalLink,
    BookOpen, Filter, ChevronRight
} from 'lucide-react';
import { videoTutorials, tutorialCategories, getTutorialsByLevel, VideoTutorial } from '@/lib/docsData';

// Level badge colors
const levelColors = {
    beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const levelLabels = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
};

export default function TutorialsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeLevel, setActiveLevel] = useState<string | null>(null);

    // Filter tutorials
    const filteredTutorials = videoTutorials.filter(tutorial => {
        const matchesSearch = !searchQuery ||
            tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = !activeLevel || tutorial.level === activeLevel;
        return matchesSearch && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
                        <Play className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300 font-medium">45 درس فيديو</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-slate-400 bg-clip-text text-transparent">
                        دروس الفيديو
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                        تعلم بالمشاهدة! دروس فيديو خطوة بخطوة من المبتدئ إلى المحترف.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="ابحث في الدروس..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => setActiveLevel(null)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${!activeLevel
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                    >
                        الكل ({videoTutorials.length})
                    </button>
                    {tutorialCategories.map((cat) => {
                        const count = getTutorialsByLevel(cat.id).length;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveLevel(cat.id)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${activeLevel === cat.id
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                {cat.title} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Quick Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/docs" className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-purple-500/50 transition-colors text-sm">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>التوثيق</span>
                    </Link>
                    <Link href="/issues" className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-purple-500/50 transition-colors text-sm">
                        <Filter className="w-4 h-4 text-yellow-400" />
                        <span>المشاكل الشائعة</span>
                    </Link>
                </div>
            </div>

            {/* Tutorials Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredTutorials.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <p className="text-slate-400 text-lg">لا توجد نتائج</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTutorials.map((tutorial) => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-800 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">هل تريد المزيد؟</h2>
                    <p className="text-slate-400 mb-8">اشترك في قناتنا للحصول على أحدث الدروس</p>
                    <a
                        href="https://www.youtube.com/@arabshield"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-all"
                    >
                        <Play className="w-5 h-5" />
                        <span>اشترك في YouTube</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

// Tutorial Card Component
function TutorialCard({ tutorial }: { tutorial: VideoTutorial }) {
    return (
        <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-600/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                    {tutorial.duration}
                </div>
                <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium border ${levelColors[tutorial.level]}`}>
                    {levelLabels[tutorial.level]}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {tutorial.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{tutorial.description}</p>

                {/* Objectives */}
                <div className="space-y-1 mb-4">
                    {tutorial.objectives.slice(0, 2).map((obj, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                            <ChevronRight className="w-3 h-3" />
                            <span>{obj}</span>
                        </div>
                    ))}
                </div>

                <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm"
                >
                    <span>شاهد الآن</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
