/**
 * Marketplace Page
 * Browse and purchase services
 */

'use client';

import { useServices, Service } from '@/lib/useDashboardData';
import ServiceGrid from '@/components/marketplace/ServiceGrid';
import PurchaseModal from '@/components/marketplace/PurchaseModal';
import { motion } from 'framer-motion';
import { Search, Filter, Package, ShoppingBag } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';

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
        <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
            {/* Hero Section */}
            <div className="relative pt-24 pb-12 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
                            <ShoppingBag size={40} className="text-white" />
                        </div>
                        <Badge variant="electric" className="mb-4 px-4 py-1.5 text-sm">
                            خدمات احترافية
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-l from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            سوق الخدمات
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            اكتشف واشتري أفضل الخدمات من الشركات الموثوقة
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-slate-800"
                >
                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="ابحث عن خدمة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-12 pl-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 mb-3">
                        <Filter size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-400">الفئات:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
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
                        <p className="text-slate-400">
                            <span className="text-white font-semibold">{filteredServices.length}</span>{' '}
                            {filteredServices.length === 1 ? 'خدمة' : 'خدمات'} متاحة
                        </p>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && filteredServices.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 border border-slate-800 rounded-full mb-6">
                            <Package size={48} className="text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            لا توجد خدمات متاحة
                        </h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                            {searchQuery || selectedCategory !== 'الكل'
                                ? 'لم يتم العثور على خدمات تطابق معايير البحث. جرب تغيير الفلتر.'
                                : 'سيتم إضافة الخدمات قريباً. تابعنا للتحديثات.'}
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

