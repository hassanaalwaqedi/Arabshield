'use client';

/**
 * Breadcrumb Navigation Component
 * Shows current location in the app hierarchy
 */

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

// Path to Arabic label mapping
const pathLabels: Record<string, string> = {
    '': 'الرئيسية',
    'dashboard': 'لوحة التحكم',
    'admin': 'الإدارة',
    'invoices': 'الفواتير',
    'orders': 'الطلبات',
    'messages': 'الرسائل',
    'projects': 'المشاريع',
    'settings': 'الإعدادات',
    'support': 'الدعم',
    'tasks': 'المهام',
    'notifications': 'الإشعارات',
    'users': 'المستخدمين',
    'new': 'جديد'
};

export function Breadcrumb() {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === '/') return null;

    // Split path and filter empty segments
    const segments = pathname.split('/').filter(Boolean);

    // Build breadcrumb items
    const items = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = pathLabels[segment] || segment;
        const isLast = index === segments.length - 1;

        return { href, label, isLast };
    });

    return (
        <nav
            className="flex items-center gap-2 text-sm text-slate-400 mb-6"
            dir="rtl"
            aria-label="Breadcrumb"
        >
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-white transition-colors"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">الرئيسية</span>
            </Link>

            {items.map((item, index) => (
                <div key={item.href} className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                    {item.isLast ? (
                        <span className="text-white font-medium">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-white transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
