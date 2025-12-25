/**
 * Dashboard Module Index
 * 
 * Barrel export file for all dashboard hooks, types, and helpers.
 * Maintains backward compatibility with existing imports.
 */

// Types
export type {
    DashboardStats,
    Activity,
    MonthlyStats,
    Project,
    Invoice,
    SupportTicket,
    Task,
    ChatMessage,
    Document,
    Rating,
    Service,
} from './types';

// Helper functions
export {
    formatRelativeTime,
    getActivityStyle,
} from './helpers';

// Re-export all hooks from the original file for now
// Individual hook files can be created for further modularization
export {
    useDashboardStats,
    useMonthlyStats,
    useRecentActivities,
    useProjects,
    useInvoices,
    useSupportTickets,
    useTasks,
    useProjectTasks,
    useProjectMessages,
    useProjectDocuments,
    useCompanyRatings,
    useAverageRating,
    useServices,
    useCompanyServices,
} from './hooks';
