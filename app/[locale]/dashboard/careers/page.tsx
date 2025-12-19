'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Briefcase, Plus, Edit2, Trash2, Eye, Users, ToggleLeft, ToggleRight,
    X, Loader2, Download, Mail, Phone, Calendar, FileText, ChevronDown, ChevronUp, ShieldX
} from 'lucide-react';
import {
    getAllJobs, createJob, updateJob, deleteJob, toggleJobStatus,
    getApplicationsByJob, Job, JobApplication, jobTypeLabels, departmentLabels
} from '@/lib/careersService';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';

export default function AdminCareersPage() {
    const { user, role, loading: authLoading } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showJobModal, setShowJobModal] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [showApplicantsModal, setShowApplicantsModal] = useState<string | null>(null);
    const [applicants, setApplicants] = useState<JobApplication[]>([]);
    const [loadingApplicants, setLoadingApplicants] = useState(false);

    // Check if user has admin privileges
    const hasAdmin = isAdminRole(role);

    useEffect(() => {
        if (!authLoading && hasAdmin) {
            fetchJobs();
        } else if (!authLoading && !hasAdmin) {
            setLoading(false);
        }
    }, [authLoading, hasAdmin]);

    async function fetchJobs() {
        const fetchedJobs = await getAllJobs();
        setJobs(fetchedJobs);
        setLoading(false);
    }

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // Access denied for non-admin users
    if (!hasAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <ShieldX className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">غير مصرح بالوصول</h1>
                <p className="text-slate-600 mb-6 max-w-md">
                    هذه الصفحة مخصصة للمسؤولين فقط. يمكنك تصفح الوظائف المتاحة والتقديم عليها من صفحة الوظائف العامة.
                </p>
                <button
                    onClick={() => router.push('/careers')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-foreground rounded-xl font-semibold transition-colors"
                >
                    تصفح الوظائف المتاحة
                </button>
            </div>
        );
    }

    const handleToggleStatus = async (job: Job) => {
        await toggleJobStatus(job.id, job.status);
        fetchJobs();
    };

    const handleDeleteJob = async (jobId: string) => {
        if (confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) {
            await deleteJob(jobId);
            fetchJobs();
        }
    };

    const handleViewApplicants = async (jobId: string) => {
        setShowApplicantsModal(jobId);
        setLoadingApplicants(true);
        const apps = await getApplicationsByJob(jobId);
        setApplicants(apps);
        setLoadingApplicants(false);
    };

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
        setShowJobModal(true);
    };

    const handleCreateNew = () => {
        setEditingJob(null);
        setShowJobModal(true);
    };

    const handleJobSaved = () => {
        setShowJobModal(false);
        setEditingJob(null);
        fetchJobs();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">إدارة الوظائف</h1>
                    <p className="text-slate-600 mt-1">إنشاء وتعديل الوظائف المتاحة ومتابعة الطلبات</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-foreground rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    إضافة وظيفة
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
                            <p className="text-slate-600 text-sm">إجمالي الوظائف</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <ToggleRight className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">
                                {jobs.filter(j => j.status === 'open').length}
                            </p>
                            <p className="text-slate-600 text-sm">وظائف مفتوحة</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">
                                {jobs.filter(j => j.status === 'closed').length}
                            </p>
                            <p className="text-slate-600 text-sm">وظائف مغلقة</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : jobs.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                    <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">لا توجد وظائف</h3>
                    <p className="text-slate-600 mb-6">ابدأ بإضافة وظيفة جديدة</p>
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-foreground rounded-xl font-semibold transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        إضافة وظيفة
                    </button>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">الوظيفة</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">القسم</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">النوع</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">الحالة</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-900">{job.title}</p>
                                                <p className="text-sm text-muted-foreground">{job.location}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {departmentLabels[job.department] || job.department}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                {jobTypeLabels[job.type] || job.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(job)}
                                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${job.status === 'open'
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {job.status === 'open' ? (
                                                    <>
                                                        <ToggleRight className="w-4 h-4" />
                                                        مفتوحة
                                                    </>
                                                ) : (
                                                    <>
                                                        <ToggleLeft className="w-4 h-4" />
                                                        مغلقة
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewApplicants(job.id)}
                                                    className="p-2 hover:bg-purple-100 rounded-lg text-purple-600 transition-colors"
                                                    title="عرض المتقدمين"
                                                >
                                                    <Users className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditJob(job)}
                                                    className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                                                    title="تعديل"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteJob(job.id)}
                                                    className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                                                    title="حذف"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Job Modal */}
            {showJobModal && (
                <JobFormModal
                    job={editingJob}
                    onClose={() => { setShowJobModal(false); setEditingJob(null); }}
                    onSave={handleJobSaved}
                />
            )}

            {/* Applicants Modal */}
            {showApplicantsModal && (
                <ApplicantsModal
                    jobId={showApplicantsModal}
                    jobTitle={jobs.find(j => j.id === showApplicantsModal)?.title || ''}
                    applicants={applicants}
                    loading={loadingApplicants}
                    onClose={() => setShowApplicantsModal(null)}
                />
            )}
        </div>
    );
}

// Job Form Modal
function JobFormModal({ job, onClose, onSave }: { job: Job | null; onClose: () => void; onSave: () => void }) {
    const [formData, setFormData] = useState({
        title: job?.title || '',
        department: job?.department || 'engineering',
        location: job?.location || '',
        type: job?.type || 'full-time',
        description: job?.description || '',
        requirements: job?.requirements?.join('\n') || '',
        responsibilities: job?.responsibilities?.join('\n') || '',
        status: job?.status || 'open'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.location || !formData.description) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        setLoading(true);

        const jobData = {
            title: formData.title,
            department: formData.department,
            location: formData.location,
            type: formData.type as 'full-time' | 'part-time' | 'remote' | 'contract',
            description: formData.description,
            requirements: formData.requirements.split('\n').filter(r => r.trim()),
            responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
            status: formData.status as 'open' | 'closed'
        };

        let success = false;
        if (job) {
            success = await updateJob(job.id, jobData);
        } else {
            const newId = await createJob(jobData);
            success = !!newId;
        }

        if (success) {
            onSave();
        } else {
            setError('حدث خطأ أثناء حفظ الوظيفة');
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                        {job ? 'تعديل الوظيفة' : 'إضافة وظيفة جديدة'}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                عنوان الوظيفة <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full h-11 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                placeholder="مثال: مطور ويب أمامي"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                الموقع <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full h-11 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                placeholder="مثال: الرياض، السعودية"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">القسم</label>
                            <select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full h-11 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            >
                                {Object.entries(departmentLabels).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">نوع العمل</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'full-time' | 'part-time' | 'remote' | 'contract' })}
                                className="w-full h-11 px-4 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            >
                                {Object.entries(jobTypeLabels).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            وصف الوظيفة <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                            placeholder="اكتب وصفاً تفصيلياً للوظيفة..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            المتطلبات (سطر لكل متطلب)
                        </label>
                        <textarea
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                            placeholder="خبرة 3 سنوات في React&#10;إتقان JavaScript&#10;مهارات تواصل ممتازة"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            المسؤوليات (سطر لكل مسؤولية)
                        </label>
                        <textarea
                            value={formData.responsibilities}
                            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                            placeholder="تطوير واجهات المستخدم&#10;مراجعة الكود&#10;التعاون مع الفريق"
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-foreground rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    جاري الحفظ...
                                </>
                            ) : (
                                <>حفظ الوظيفة</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Applicants Modal
function ApplicantsModal({
    jobId, jobTitle, applicants, loading, onClose
}: {
    jobId: string;
    jobTitle: string;
    applicants: JobApplication[];
    loading: boolean;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">المتقدمين</h3>
                        <p className="text-slate-600 text-sm">وظيفة: {jobTitle}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : applicants.length === 0 ? (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">لا يوجد متقدمين لهذه الوظيفة بعد</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applicants.map((app) => (
                            <div key={app.id} className="border border-slate-200 rounded-xl p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{app.name}</h4>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {app.email}
                                            </span>
                                            {app.phone && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    {app.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <a
                                        href={app.cvUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        تحميل CV
                                    </a>
                                </div>
                                {app.message && (
                                    <p className="mt-3 text-slate-600 text-sm bg-slate-50 p-3 rounded-lg">
                                        {app.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
