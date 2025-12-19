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
 * Desktop: Uses row-reverse, so sidebar is on LEFT, content margin on START (left)
 * Mobile: Sidebar is overlay, no margin needed, full width
 */
export function MainContent({ children }: MainContentProps) {
    const { isCollapsed } = useSidebar();

    const sidebarWidth = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

    return (
        <div
            className="flex-grow flex flex-col min-h-screen w-full max-w-full transition-all duration-300 ease-out"
            style={{
                // Desktop: Sidebar is on left (via row-reverse), so add margin to start
                marginInlineStart: `${sidebarWidth}px`,
            }}
        >
            {/* Mobile: Remove sidebar margin, ensure full width and proper padding */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div {
                        margin-inline-start: 0 !important;
                        margin-inline-end: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }
                }
            `}</style>
            {children}
        </div>
    );
}
