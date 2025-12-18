/**
 * Service Card Component
 * Display service in marketplace
 */

'use client';

import { Service } from '@/lib/useDashboardData';
import { formatPrice } from '@/lib/serviceService';
import { motion } from 'framer-motion';
import { Tag, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="bg-card/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
        >
            {/* Service Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600">
                {service.imageUrl ? (
                    <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                        {service.title[0]}
                    </div>
                )}
                {service.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        مميز
                    </div>
                )}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-lg text-sm font-bold text-foreground">
                    {service.category}
                </div>
            </div>

            {/* Service Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{service.description}</p>

                {/* Company */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Building2 size={16} />
                    <span>{service.companyName}</span>
                </div>

                {/* Tags */}
                {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg"
                            >
                                <Tag size={12} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                        <div className="text-2xl font-bold text-foreground">
                            {formatPrice(service.price, service.currency)}
                        </div>
                    </div>
                    <Link
                        href={`/marketplace/${service.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <span>التفاصيل</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

