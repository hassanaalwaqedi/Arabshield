/**
 * Purchase Modal Component
 * Service purchase flow with payment placeholder
 */

'use client';

import { Service } from '@/lib/useDashboardData';
import { formatPrice } from '@/lib/serviceService';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface PurchaseModalProps {
    service: Service | null;
    onClose: () => void;
}

export default function PurchaseModal({ service, onClose }: PurchaseModalProps) {
    const [purchased, setPurchased] = useState(false);

    if (!service) return null;

    const handlePurchase = () => {
        // Placeholder for payment integration
        setPurchased(true);
        setTimeout(() => {
            setPurchased(false);
            onClose();
        }, 3000);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                >
                    {!purchased ? (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900">شراء الخدمة</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                {/* Service Info */}
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <h4 className="font-bold text-slate-900 mb-2">{service.title}</h4>
                                    <p className="text-sm text-slate-600 mb-3">{service.description}</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                        <span className="text-sm text-muted-foreground">السعر</span>
                                        <span className="text-xl font-bold text-slate-900">
                                            {formatPrice(service.price, service.currency)}
                                        </span>
                                    </div>
                                </div>

                                {/* Payment Placeholder */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <CreditCard className="text-blue-600 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-sm text-blue-900 font-medium mb-1">
                                                عملية الدفع قيد التطوير
                                            </p>
                                            <p className="text-xs text-blue-700">
                                                سيتم دمج بوابة الدفع قريباً. هذه نسخة تجريبية.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 p-6 bg-slate-50 border-t border-slate-200">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handlePurchase}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-xl hover:shadow-lg transition-all"
                                >
                                    تأكيد الشراء
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                            >
                                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">تم الشراء بنجاح!</h3>
                            <p className="text-slate-600">سيتم التواصل معك قريباً</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
