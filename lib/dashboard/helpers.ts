/**
 * Dashboard Helper Functions
 * 
 * Utility functions for dashboard data formatting and styling.
 * Extracted from useDashboardData.ts for better organization.
 */

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} دقيقة مضت`;
    if (diffHours < 24) return `${diffHours} ساعة مضت`;
    if (diffDays < 7) return `${diffDays} يوم مضى`;
    return date.toLocaleDateString('ar-SA');
}

/**
 * Get icon and color for activity type
 */
export function getActivityStyle(type: string) {
    const styles = {
        order_created: { color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
        order_updated: { color: 'green', gradient: 'from-green-500 to-emerald-600' },
        order_completed: { color: 'green', gradient: 'from-green-500 to-emerald-600' },
        payment_received: { color: 'electric', gradient: 'from-electric-500 to-cyan-600' },
        ticket_opened: { color: 'orange', gradient: 'from-orange-500 to-red-500' },
        ticket_resolved: { color: 'green', gradient: 'from-green-500 to-emerald-600' },
        default: { color: 'purple', gradient: 'from-purple-500 to-pink-600' }
    };

    return styles[type as keyof typeof styles] || styles.default;
}
