'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Briefcase, MapPin, Clock, Building2, ArrowRight, ArrowLeft,
    CheckCircle, Upload, X, Loader2, Send, FileText
} from 'lucide-react';
import { getJobById, submitApplication, Job, jobTypeLabels, departmentLabels } from '@/lib/careersService';

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as string;

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    useEffect(() => {
        async function fetchJob() {
            if (jobId) {
                const fetchedJob = await getJobById(jobId);
                setJob(fetchedJob);
                setLoading(false);
            }
        }
        fetchJob();
    }, [jobId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
                <div className="text-center">
                    <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">الوظيفة غير موجودة</h1>
                    <p className="text-muted-foreground mb-6">لم نتمكن من العثور على هذه الوظيفة.</p>
                    <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors">
                        <ArrowRight className="w-4 h-4" />
                        العودة للوظائف
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950 to-slate-950"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                    <Link href="/careers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                        العودة للوظائف
                    </Link>

                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.type === 'remote'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    }`}>
                                    {jobTypeLabels[job.type] || job.type}
                                </span>
                                {job.status === 'closed' && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                        مغلقة
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
                            <div className="flex flex-wrap gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-5 h-5" />
                                    <span>{departmentLabels[job.department] || job.department}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-card/50 border border-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">عن الوظيفة</h2>
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </p>
                        </div>

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <div className="bg-card/50 border border-border rounded-2xl p-6">
                                <h2 className="text-xl font-bold mb-4">المتطلبات</h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Responsibilities */}
                        {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="bg-card/50 border border-border rounded-2xl p-6">
                                <h2 className="text-xl font-bold mb-4">المسؤوليات</h2>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((resp, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-card/50 border border-border rounded-2xl p-6 sticky top-24">
                            <h3 className="text-lg font-bold mb-4">تقدم الآن</h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                {job.status === 'open'
                                    ? 'هذه الوظيفة متاحة حالياً. قدم طلبك الآن!'
                                    : 'هذه الوظيفة مغلقة حالياً.'}
                            </p>
                            <button
                                onClick={() => setShowApplicationModal(true)}
                                disabled={job.status === 'closed'}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                قدم الآن
                                <Send className="w-4 h-4" />
                            </button>

                            <div className="mt-6 pt-6 border-t border-border">
                                <h4 className="text-sm font-medium text-muted-foreground mb-3">شارك هذه الوظيفة</h4>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-muted hover:bg-slate-700 rounded-lg text-sm transition-colors">
                                        نسخ الرابط
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {showApplicationModal && (
                <ApplicationModal
                    job={job}
                    onClose={() => setShowApplicationModal(false)}
                />
            )}
        </div>
    );
}

// Application Modal Component
function ApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setError('يرجى رفع ملف PDF فقط');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('حجم الملف يجب أن يكون أقل من 5MB');
                return;
            }
            setCvFile(file);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        if (!cvFile) {
            setError('يرجى رفع السيرة الذاتية');
            return;
        }

        setLoading(true);

        const result = await submitApplication({
            jobId: job.id,
            jobTitle: job.title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            message: formData.message
        }, cvFile);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error || 'حدث خطأ أثناء إرسال الطلب');
        }

        setLoading(false);
    };

    if (success) {
        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">تم إرسال طلبك بنجاح!</h3>
                    <p className="text-muted-foreground mb-6">
                        شكراً لتقديمك على وظيفة "{job.title}". سنتواصل معك قريباً.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-colors"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-foreground">التقديم على الوظيفة</h3>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <p className="text-muted-foreground mb-6">
                    التقديم على: <span className="text-foreground font-medium">{job.title}</span>
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            الاسم الكامل <span className="text-blue-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="أدخل اسمك الكامل"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            البريد الإلكتروني <span className="text-blue-400">*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            رقم الهاتف (اختياري)
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="+966 5XX XXX XXXX"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            السيرة الذاتية (PDF) <span className="text-blue-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                id="cv-upload"
                            />
                            <label
                                htmlFor="cv-upload"
                                className={`flex items-center justify-center gap-3 w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all ${cvFile
                                        ? 'border-green-500/50 bg-green-500/5'
                                        : 'border-border hover:border-blue-500/50 hover:bg-muted/50'
                                    }`}
                            >
                                {cvFile ? (
                                    <>
                                        <FileText className="w-6 h-6 text-green-400" />
                                        <span className="text-green-400">{cvFile.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                        <span className="text-muted-foreground">اضغط لرفع السيرة الذاتية</span>
                                    </>
                                )}
                            </label>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">PDF فقط، حجم أقصى 5MB</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            رسالة التقديم <span className="text-blue-400">*</span>
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                            placeholder="اكتب رسالة قصيرة عن نفسك ولماذا تريد هذه الوظيفة..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                جاري الإرسال...
                            </>
                        ) : (
                            <>
                                إرسال الطلب
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
