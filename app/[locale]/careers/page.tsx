'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Building2, Search, Filter, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getOpenJobs, Job } from '@/lib/careersService';

export default function CareersPage() {
    const t = useTranslations('careers');
    const tJobTypes = useTranslations('jobTypes');
    const tDepartments = useTranslations('departments');
    const tCommon = useTranslations('common');

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

    // Get translated job type label
    const getJobTypeLabel = (type: string) => {
        try {
            return tJobTypes(type as any);
        } catch {
            return type;
        }
    };

    // Get translated department label
    const getDepartmentLabel = (department: string) => {
        try {
            return tDepartments(department as any);
        } catch {
            return department;
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">{t('badge')}</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                        {t('subtitle')}
                    </p>

                    {/* Search and Filter */}
                    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-14 pr-12 pl-4 bg-card/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="h-14 pr-12 pl-6 bg-card/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer min-w-[180px]"
                            >
                                <option value="all">{t('filterAll')}</option>
                                <option value="full-time">{t('filterFullTime')}</option>
                                <option value="part-time">{t('filterPartTime')}</option>
                                <option value="remote">{t('filterRemote')}</option>
                                <option value="contract">{t('filterContract')}</option>
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
                        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-12 h-12 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{t('noJobsTitle')}</h3>
                        <p className="text-muted-foreground mb-8">
                            {t('noJobsDescription')}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
                        >
                            {tCommon('contactUs')}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">
                                {filteredJobs.length} {t('openPositions')}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    getJobTypeLabel={getJobTypeLabel}
                                    getDepartmentLabel={getDepartmentLabel}
                                    viewDetailsText={t('viewDetails')}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// Job Card Component
function JobCard({
    job,
    getJobTypeLabel,
    getDepartmentLabel,
    viewDetailsText
}: {
    job: Job;
    getJobTypeLabel: (type: string) => string;
    getDepartmentLabel: (department: string) => string;
    viewDetailsText: string;
}) {
    return (
        <Link href={`/careers/${job.id}`}>
            <div className="group bg-card/50 border border-border rounded-2xl p-6 hover:border-blue-500/50 hover:bg-card transition-all duration-300 cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.type === 'remote'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                        {getJobTypeLabel(job.type)}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                    {job.title}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Building2 className="w-4 h-4" />
                        <span>{getDepartmentLabel(job.department)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                    </div>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {job.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-blue-400 text-sm font-medium group-hover:underline">
                        {viewDetailsText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
