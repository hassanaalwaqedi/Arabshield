/**
 * Marketplace Page
 * Browse and purchase services
 */

'use client';

import { useServices, Service } from '@/lib/useDashboardData';
import ServiceGrid from '@/components/marketplace/ServiceGrid';
import PurchaseModal from '@/components/marketplace/PurchaseModal';
import { motion } from 'framer-motion';
import { Search, Filter, Package } from 'lucide-react';
import { useState, useMemo } from 'react';

const CATEGORIES = [
    'الكل',
    'الأمن السيبراني',
    'تطوير البرمجيات',
    'الاستشارات',
    'التصميم',
    'التسويق',
    'الصيانة'
];

export default function MarketplacePage() {
    const { services, loading } = useServices();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    // Filter services
    const filteredServices = useMemo(() => {
        let filtered = [...services];

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(service =>
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'الكل') {
            filtered = filtered.filter(service => service.category === selectedCategory);
        }

        return filtered;
    }, [services, searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                        <Package size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        سوق الخدمات
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        اكتشف واشتري أفضل الخدمات من الشركات الموثوقة
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-slate-200"
                >
                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="ابحث عن خدمة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">الفئات:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Results Count */}
                {(searchQuery || selectedCategory !== 'الكل') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6"
                    >
                        <p className="text-slate-600">
                            {filteredServices.length} {filteredServices.length === 1 ? 'خدمة' : 'خدمات'} متاحة
                        </p>
                    </motion.div>
                )}

                {/* Services Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <ServiceGrid services={filteredServices} loading={loading} />
                </motion.div>

                {/* Purchase Modal */}
                <PurchaseModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            </div>
        </div>
    );
}
