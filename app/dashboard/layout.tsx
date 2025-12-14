/**
 * Dashboard Layout Wrapper
 * Wraps all dashboard pages with the DashboardLayout component
 */

'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div lang="ar" dir="rtl">
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </div>
    );
}
