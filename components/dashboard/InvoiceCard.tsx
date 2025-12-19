/**
 * Invoice Card Component
 * Displays invoice information with status and actions
 */

'use client';

import { Invoice } from '@/lib/useDashboardData';
import { motion } from 'framer-motion';
import { Download, Calendar, DollarSign } from 'lucide-react';

interface InvoiceCardProps {
    invoice: Invoice;
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'paid': return 'مدفوعة';
            case 'pending': return 'قيد الانتظار';
            case 'overdue': return 'متأخرة';
            default: return status;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            className="bg-white/70 backdrop-blur-xl rounded-xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={18} className="text-blue-600" />
                        <span className="text-sm text-slate-600">Invoice #{invoice.id.slice(0, 8)}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                        ${invoice.amount.toLocaleString()}
                    </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusLabel(invoice.status)}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} />
                    <span>تاريخ الاستحقاق: {new Date(invoice.dueDate).toLocaleDateString('ar-SA')}</span>
                </div>
                {invoice.paidAt && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <Calendar size={14} />
                        <span>تاريخ الدفع: {new Date(invoice.paidAt).toLocaleDateString('ar-SA')}</span>
                    </div>
                )}
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-lg hover:shadow-lg transition-all">
                <Download size={16} />
                <span>تحميل الفاتورة</span>
            </button>
        </motion.div>
    );
}
