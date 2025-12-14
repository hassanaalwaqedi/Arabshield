/**
 * Dashboard Layout Wrapper
 * Wraps all dashboard pages with the DashboardLayout component
 * Also enforces maintenance mode blocking via MaintenanceGuard
 */

'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MaintenanceGuard } from '@/components/MaintenanceGuard';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div lang="ar" dir="rtl">
            <MaintenanceGuard>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </MaintenanceGuard>
        </div>
    );
}
