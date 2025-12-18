'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, CreditCard, MessageSquare, Clock, TrendingUp, AlertCircle, CheckCircle2, Download, Bell, ChevronRight, Activity, Shield, Zap, Users, BarChart3, ArrowUpRight, Calendar, Filter } from 'lucide-react';
import { useDashboardStats, useMonthlyStats, useRecentActivities, useProjects, formatRelativeTime, getActivityStyle } from '@/lib/useDashboardData';
import { useNotifications, useSystemHealth } from '@/lib/useNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminRole } from '@/lib/admin';

export default function DashboardPage() {
    const router = useRouter();
    const [showDownloadTooltip, setShowDownloadTooltip] = useState(false);
    const [todayDate, setTodayDate] = useState<string>('');

    // Get current user and role
    const { user, role } = useAuth();
    const isAdmin = isAdminRole(role);

    // Fetch real-time data from Firestore
    const { stats, loading: statsLoading } = useDashboardStats(user?.uid);
    const { monthlyStats, loading: monthlyLoading } = useMonthlyStats();
    const { activities, loading: activitiesLoading } = useRecentActivities(user?.uid, 5);
    const { projects, loading: projectsLoading } = useProjects(user?.uid);

    // Fetch notifications and system health from Cloud Functions data
    const { unreadCount, loading: notificationsLoading } = useNotifications(user?.uid, 10);
    const { systemHealth, loading: healthLoading } = useSystemHealth();

    // Set date on client only to prevent hydration mismatch
    useEffect(() => {
        setTodayDate(new Date().toLocaleDateString('ar-SA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }));
    }, []);

    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-gradient-to-br from-abyss-50 via-electric-50/20 to-cyan-50/30 relative overflow-hidden">
            {/* Animated Mesh Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-electric-400/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-electric-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>


            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto relative z-10">
                {/* Header */}
                <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-abyss-900 via-electric-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                            مرحباً بعودتك! 👋
                        </h1>
                        <p className="text-abyss-600 text-lg">هذا ما يحدث مع مشاريعك اليوم.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-white/70 hover:bg-white backdrop-blur-xl px-4 py-3 rounded-2xl border border-abyss-200/50 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                            <Calendar className="h-4 w-4 text-abyss-600 group-hover:text-electric-600 transition-colors" />
                            <span className="text-sm font-semibold text-abyss-700">{todayDate}</span>
                        </button>
                        <button
                            onClick={() => router.push('/dashboard/notifications')}
                            className="relative flex items-center gap-2 bg-white/70 hover:bg-white backdrop-blur-xl px-4 py-3 rounded-2xl border border-abyss-200/50 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                        >
                            <Bell className="h-5 w-5 text-abyss-600 group-hover:text-electric-600 transition-colors group-hover:animate-pulse" />
                            {/* Real-time notification count from Firestore */}
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full shadow-lg animate-bounce">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 mb-8 animate-fade-in">
                    {/* Active Projects Card */}
                    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-abyss-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-abyss-600 text-sm uppercase tracking-wide">المشاريع النشطة</h3>
                                <div className="bg-gradient-to-br from-electric-500 to-cyan-600 p-3.5 rounded-2xl shadow-lg shadow-electric-500/40 group-hover:shadow-2xl group-hover:shadow-electric-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <FileText className="text-white h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-5xl font-bold text-abyss-900 mb-2">{stats.activeProjects || 0}</p>
                                    <div className="flex items-center gap-1.5 text-green-600">
                                        <TrendingUp size={16} className="animate-pulse" />
                                        <p className="text-sm font-semibold">قيد التنفيذ</p>
                                    </div>
                                </div>
                                {/* Removed hardcoded +20% comparison - will implement with real historical data */}
                            </div>
                        </div>
                    </div>

                    {/* Pending Invoices Card */}
                    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-abyss-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-abyss-600 text-sm uppercase tracking-wide">الفواتير المعلقة</h3>
                                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3.5 rounded-2xl shadow-lg shadow-orange-500/40 group-hover:shadow-2xl group-hover:shadow-orange-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <CreditCard className="text-white h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-5xl font-bold text-abyss-900 mb-2">
                                        {statsLoading ? '...' : `$${stats.pendingInvoices?.toLocaleString() || 0}`}
                                    </p>
                                    {stats.pendingInvoices > 0 && (
                                        <div className="flex items-center gap-1.5 text-orange-600">
                                            <AlertCircle size={16} className="animate-pulse" />
                                            <p className="text-sm font-semibold">فواتير غير مدفوعة</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => router.push('/dashboard/invoices')}
                                    className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                                >
                                    ادفع الآن
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Open Tickets Card */}
                    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-abyss-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-abyss-600 text-sm uppercase tracking-wide">التذاكر المفتوحة</h3>
                                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3.5 rounded-2xl shadow-lg shadow-purple-500/40 group-hover:shadow-2xl group-hover:shadow-purple-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <MessageSquare className="text-white h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-5xl font-bold text-abyss-900 mb-2">
                                        {statsLoading ? '...' : stats.openTickets}
                                    </p>
                                    {stats.openTickets === 0 ? (
                                        <div className="flex items-center gap-1.5 text-green-600">
                                            <CheckCircle2 size={16} />
                                            <p className="text-sm font-semibold">لا توجد تذاكر مفتوحة</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-orange-600">
                                            <AlertCircle size={16} />
                                            <p className="text-sm font-semibold">تذاكر تحتاج اهتمام</p>
                                        </div>
                                    )}
                                </div>
                                {/* Show resolution rate only if there are any tickets */}
                                {(stats.openTickets + stats.resolvedTickets) > 0 && (
                                    <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${stats.openTickets === 0
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {Math.round((stats.resolvedTickets / (stats.openTickets + stats.resolvedTickets)) * 100)}% محلولة
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* System Health Card */}
                    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-abyss-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-abyss-600 text-sm uppercase tracking-wide">صحة النظام</h3>
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3.5 rounded-2xl shadow-lg shadow-green-500/40 group-hover:shadow-2xl group-hover:shadow-green-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <Activity className="text-white h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    {/* Use server-computed systemHealth from Cloud Functions */}
                                    {healthLoading ? (
                                        <div className="animate-pulse">
                                            <div className="h-12 w-24 bg-abyss-200 rounded mb-2"></div>
                                            <div className="h-4 w-16 bg-abyss-100 rounded"></div>
                                        </div>
                                    ) : systemHealth !== null ? (
                                        <>
                                            <p className="text-5xl font-bold text-abyss-900 mb-2">{systemHealth}%</p>
                                            <div className={`flex items-center gap-1.5 ${systemHealth >= 95 ? 'text-green-600' : systemHealth >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                <Zap size={16} className="animate-pulse" />
                                                <p className="text-sm font-semibold">{systemHealth >= 95 ? 'مثالي' : systemHealth >= 80 ? 'جيد' : 'يحتاج اهتمام'}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-4xl font-bold text-abyss-400 mb-2">N/A</p>
                                            <div className="flex items-center gap-1.5 text-abyss-400">
                                                <Clock size={16} />
                                                <p className="text-sm font-semibold">غير متوفر</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {systemHealth !== null && !healthLoading && (
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="h-1.5 w-16 bg-abyss-100 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-1000 ${systemHealth >= 95 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : systemHealth >= 80 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`} style={{ width: `${systemHealth}%` }}></div>
                                        </div>
                                        <p className="text-xs text-abyss-500">وقت التشغيل</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in-up">
                    {/* Recent Activity */}
                    <div className="xl:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-abyss-200/50 p-7">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-abyss-900 mb-1">الأنشطة الأخيرة</h3>
                                <p className="text-sm text-abyss-500">تابع آخر التحديثات والتغييرات</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-abyss-100 rounded-xl transition-all" title="تصفية الأنشطة">
                                    <Filter className="h-4 w-4 text-abyss-600" />
                                </button>
                                <button
                                    onClick={() => router.push('/dashboard/notifications')}
                                    className="text-sm text-electric-600 hover:text-electric-700 font-semibold flex items-center gap-1 px-3 py-2 hover:bg-electric-50 rounded-xl transition-all"
                                >
                                    عرض الكل
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {activitiesLoading ? (
                                // Loading state
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-600"></div>
                                </div>
                            ) : activities.length > 0 ? (
                                // Real-time activities from Firestore
                                activities.map((activity) => {
                                    const style = getActivityStyle(activity.type);
                                    const IconComponent = activity.type.includes('order') ? FileText :
                                        activity.type.includes('payment') ? CreditCard :
                                            activity.type.includes('ticket') ? MessageSquare :
                                                CheckCircle2;

                                    return (
                                        <div key={activity.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-electric-50/30 transition-all duration-300 group cursor-pointer border border-transparent hover:border-abyss-200/50 hover:shadow-lg">
                                            <div className={`bg-gradient-to-br ${style.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                                <IconComponent className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-abyss-900 mb-1 group-hover:text-electric-700 transition-colors">
                                                    {activity.description}
                                                </p>
                                                <p className="text-xs text-abyss-400 flex items-center gap-1.5">
                                                    <Clock size={12} />
                                                    {formatRelativeTime(activity.timestamp)}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-abyss-300 group-hover:text-electric-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    );
                                })
                            ) : (
                                // Empty state
                                <div className="text-center py-8 text-abyss-500">
                                    <p>لا توجد أنشطة حديثة</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-abyss-200/50 p-6">
                            <h3 className="text-lg font-bold text-abyss-900 mb-1">إجراءات سريعة</h3>
                            <p className="text-xs text-abyss-500 mb-4">المهام والاختصارات الشائعة</p>
                            <div className="space-y-2.5">
                                <button
                                    onClick={() => router.push('/dashboard/support/new')}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-electric-500 via-electric-600 to-cyan-600 text-white hover:shadow-2xl hover:shadow-electric-500/50 transition-all group relative overflow-hidden hover:scale-[1.02]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <span className="font-semibold text-sm relative z-10">تذكرة دعم جديدة</span>
                                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                                </button>
                                <button
                                    onClick={() => router.push('/dashboard/invoices')}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-abyss-200 hover:border-electric-500 hover:bg-electric-50/50 transition-all group hover:shadow-lg hover:scale-[1.02]"
                                >
                                    <span className="font-semibold text-sm text-abyss-900">عرض الفواتير</span>
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-abyss-400 group-hover:text-electric-600" />
                                </button>
                                <div className="relative">
                                    <button
                                        onMouseEnter={() => setShowDownloadTooltip(true)}
                                        onMouseLeave={() => setShowDownloadTooltip(false)}
                                        disabled
                                        className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-abyss-200 opacity-50 cursor-not-allowed"
                                    >
                                        <span className="font-semibold text-sm text-abyss-900">تحميل التقارير</span>
                                        <Download size={16} className="text-abyss-400" />
                                    </button>
                                    {showDownloadTooltip && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-abyss-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                                            قريباً
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Activity Panel - Shows personal for users, team for admins */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-abyss-200/50 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-electric-600" />
                                    <h3 className="text-lg font-bold text-abyss-900">
                                        {isAdmin ? 'نشاط الفريق' : 'نشاطي الأخير'}
                                    </h3>
                                </div>
                                {isAdmin && (
                                    <span className="text-xs bg-electric-100 text-electric-700 px-2 py-1 rounded-full font-medium">
                                        مدير
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3">
                                {activitiesLoading ? (
                                    <div className="flex items-center justify-center py-6">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-electric-600"></div>
                                    </div>
                                ) : activities.length > 0 ? (
                                    activities.slice(0, 3).map((activity, i) => {
                                        const colors = [
                                            'from-green-500 to-emerald-600',
                                            'from-electric-500 to-cyan-600',
                                            'from-purple-500 to-pink-600'
                                        ];
                                        return (
                                            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-abyss-50/50 transition-all cursor-pointer group">
                                                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colors[i % 3]} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                                                    {activity.type.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-abyss-900 text-sm truncate">{activity.description}</p>
                                                    <p className="text-xs text-abyss-500">{activity.type}</p>
                                                </div>
                                                <span className="text-xs text-abyss-400">{formatRelativeTime(activity.timestamp)}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-6 text-abyss-500">
                                        <p className="text-sm">لا توجد أنشطة حديثة</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Progress - Using real projects from Firestore */}
                        <div className="bg-gradient-to-br from-slate-900 via-abyss-800 to-electric-900 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-electric-500/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-lg font-bold">التقدم العام</h3>
                                    <BarChart3 className="h-5 w-5 text-electric-400" />
                                </div>
                                <div className="space-y-5">
                                    {projectsLoading ? (
                                        <div className="flex items-center justify-center py-6">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        </div>
                                    ) : projects.length > 0 ? (
                                        projects.slice(0, 3).map((project, i) => {
                                            const colors = [
                                                { text: 'text-electric-400', gradient: 'from-electric-500 via-cyan-400 to-electric-600', shadow: 'shadow-electric-500/50' },
                                                { text: 'text-purple-400', gradient: 'from-purple-500 via-pink-400 to-purple-600', shadow: 'shadow-purple-500/50' },
                                                { text: 'text-green-400', gradient: 'from-green-500 via-emerald-400 to-green-600', shadow: 'shadow-green-500/50' }
                                            ];
                                            const color = colors[i % 3];
                                            const progress = project.progress ?? 0;
                                            return (
                                                <div key={project.id}>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="text-abyss-200 font-medium">{project.title}</span>
                                                        <span className={`font-bold ${color.text}`}>
                                                            {progress > 0 ? `${progress}%` : '—'}
                                                        </span>
                                                    </div>
                                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                                        <div
                                                            className={`h-full bg-gradient-to-r ${color.gradient} rounded-full shadow-lg ${color.shadow} transition-all duration-1000`}
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-6 text-abyss-500">
                                            <p className="text-sm">لا توجد مشاريع</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
