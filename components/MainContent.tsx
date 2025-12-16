"use client";

import { ReactNode } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { SIDEBAR_WIDTH_OPEN, SIDEBAR_WIDTH_COLLAPSED } from '@/components/Sidebar';

interface MainContentProps {
    children: ReactNode;
}

/**
 * MainContent wrapper that adjusts margin based on sidebar state
 * Provides smooth transition when sidebar collapses/expands
 */
export function MainContent({ children }: MainContentProps) {
    const { isCollapsed } = useSidebar();

    const marginLeft = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

    return (
        <div
            className="flex-grow flex flex-col min-h-screen transition-all duration-300 ease-out"
            style={{
                marginLeft: `${marginLeft}px`,
                // On mobile, no margin (sidebar is overlay)
            }}
        >
            <style jsx>{`
                @media (max-width: 767px) {
                    div {
                        margin-left: 0 !important;
                    }
                }
            `}</style>
            {children}
        </div>
    );
}
