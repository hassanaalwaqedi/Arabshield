import type { Metadata } from 'next';
import { LayoutDashboard, FileText, Settings, CreditCard, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Client Dashboard',
};

export default function DashboardPage() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block shrink-0 h-full">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-navy-900 flex items-center justify-center text-white font-bold">
                            AS
                        </div>
                        <div>
                            <p className="font-bold text-navy-900">ArabShield</p>
                            <p className="text-xs text-slate-500">Client Portal</p>
                        </div>
                    </div>
                </div>
                <nav className="space-y-1 p-4">
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-tech-blue text-white rounded-lg font-medium shadow-md shadow-blue-500/20">
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group">
                        <FileText size={20} className="group-hover:text-tech-blue" />
                        <span>My Projects</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group">
                        <CreditCard size={20} className="group-hover:text-tech-blue" />
                        <span>Invoices</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group">
                        <MessageSquare size={20} className="group-hover:text-tech-blue" />
                        <span>Support Tickets</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group">
                        <Settings size={20} className="group-hover:text-tech-blue" />
                        <span>Settings</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-navy-900">Welcome back, Client</h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-600">Active Projects</h3>
                            <div className="bg-blue-50 p-2 rounded-lg"><FileText className="text-tech-blue h-5 w-5" /></div>
                        </div>
                        <p className="text-3xl font-bold text-navy-900">2</p>
                        <p className="text-sm text-green-500 flex items-center mt-2 font-medium">In Progress</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-600">Pending Invoices</h3>
                            <div className="bg-orange-50 p-2 rounded-lg"><CreditCard className="text-orange-500 h-5 w-5" /></div>
                        </div>
                        <p className="text-3xl font-bold text-navy-900">$1,500</p>
                        <p className="text-sm text-slate-400 mt-2">Due in 5 days</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-600">Open Tickets</h3>
                            <div className="bg-purple-50 p-2 rounded-lg"><MessageSquare className="text-purple-500 h-5 w-5" /></div>
                        </div>
                        <p className="text-3xl font-bold text-navy-900">0</p>
                        <p className="text-sm text-slate-400 mt-2">Everything is smooth</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-navy-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start space-x-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="bg-slate-100 p-2 rounded-full mt-1">
                                    <Clock className="h-4 w-4 text-slate-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-navy-900">Project "E-commerce App" updated</p>
                                    <p className="text-sm text-slate-500">Design phase completed. Moving to development.</p>
                                    <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
