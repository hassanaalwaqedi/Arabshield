/**
 * Service Grid Component
 * Grid layout for services
 */

'use client';

import { Service } from '@/lib/useDashboardData';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface ServiceGridProps {
    services: Service[];
    loading?: boolean;
}

export default function ServiceGrid({ services, loading }: ServiceGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-300"
            >
                <Package size={64} className="text-slate-300 mb-4" />
                <p className="text-slate-600 text-xl mb-2">لا توجد خدمات</p>
                <p className="text-sm text-muted-foreground">جرب تغيير الفلاتر أو البحث</p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    );
}
