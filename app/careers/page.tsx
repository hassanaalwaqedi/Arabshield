'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, Building2, Search, Filter, ArrowRight, Users } from 'lucide-react';
import { getOpenJobs, Job, jobTypeLabels, departmentLabels } from '@/lib/careersService';

export default function CareersPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');

    useEffect(() => {
        async function fetchJobs() {
            const fetchedJobs = await getOpenJobs();
            setJobs(fetchedJobs);
            setLoading(false);
        }
        fetchJobs();
    }, []);

    // Filter jobs based on search and type
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || job.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">انضم إلى فريقنا</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        الوظائف المتاحة
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                        نبحث عن مواهب استثنائية للانضمام إلى فريقنا. اكتشف الفرص المتاحة وابدأ مسيرتك المهنية معنا.
                    </p>

                    {/* Search and Filter */}
                    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="ابحث عن وظيفة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-14 pr-12 pl-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="h-14 pr-12 pl-6 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer min-w-[180px]"
                            >
                                <option value="all">جميع الأنواع</option>
                                <option value="full-time">دوام كامل</option>
                                <option value="part-time">دوام جزئي</option>
                                <option value="remote">عن بعد</option>
                                <option value="contract">عقد مؤقت</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-12 h-12 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">لا توجد وظائف حالياً</h3>
                        <p className="text-slate-400 mb-8">
                            {searchTerm || filterType !== 'all'
                                ? 'لم نجد وظائف تطابق بحثك. جرب تغيير معايير البحث.'
                                : 'لا توجد وظائف متاحة في الوقت الحالي. تابعنا للحصول على أحدث الفرص.'}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
                        >
                            تواصل معنا
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">
                                {filteredJobs.length} وظيفة متاحة
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Why Join Us Section */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تنضم إلى ArabShield؟</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            نوفر بيئة عمل محفزة ومميزات تنافسية لمساعدتك على النمو والتطور.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🚀', title: 'نمو مهني', desc: 'فرص تطوير وتعلم مستمر' },
                            { icon: '💰', title: 'رواتب تنافسية', desc: 'مكافآت ومزايا مميزة' },
                            { icon: '🏠', title: 'عمل مرن', desc: 'إمكانية العمل عن بعد' },
                            { icon: '👥', title: 'فريق متميز', desc: 'اعمل مع أفضل الكفاءات' },
                        ].map((benefit, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-colors"
                            >
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-slate-400 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Job Card Component
function JobCard({ job }: { job: Job }) {
    return (
        <Link href={`/careers/${job.id}`}>
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.type === 'remote'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                        {jobTypeLabels[job.type] || job.type}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {job.title}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Building2 className="w-4 h-4" />
                        <span>{departmentLabels[job.department] || job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                    </div>
                </div>

                <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {job.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-blue-400 text-sm font-medium group-hover:underline">
                        عرض التفاصيل
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
