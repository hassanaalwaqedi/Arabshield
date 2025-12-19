"use client";

import { ReactNode } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';

interface MainContentProps {
    children: ReactNode;
}

// Sidebar widths
const SIDEBAR_WIDTH_OPEN = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;

/**
 * MainContent wrapper that adjusts margin based on sidebar state
 * RTL: Sidebar is on RIGHT, so we use margin-inline-end
 * Mobile (≤768px): Sidebar is overlay, no margin needed
 */
export function MainContent({ children }: MainContentProps) {
    const { isCollapsed } = useSidebar();

    const sidebarWidth = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

    return (
        <div
            className="flex-grow flex flex-col min-h-screen w-full transition-all duration-300 ease-out"
            style={{
                // RTL: margin-inline-end = margin-right in RTL, margin-left in LTR
                marginInlineEnd: `${sidebarWidth}px`,
            }}
        >
            {/* Mobile (≤768px): Remove sidebar margin */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div {
                        margin-inline-end: 0 !important;
                    }
                }
            `}</style>
            {children}
        </div>
    );
}
