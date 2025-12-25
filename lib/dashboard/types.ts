/**
 * Dashboard Types
 * 
 * All TypeScript interfaces and types for dashboard hooks.
 * Extracted from useDashboardData.ts for better organization.
 */

// Dashboard statistics type
export interface DashboardStats {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalRevenue: number;
    pendingInvoices: number;
    openTickets: number;
    resolvedTickets: number;
    systemHealth: number | null;
}

// Activity type
export interface Activity {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    userId?: string;
    orderId?: string;
}

// Monthly statistics type
export interface MonthlyStats {
    newOrders: number;
    completedOrders: number;
    meetings: number;
}

// Project type
export interface Project {
    id: string;
    title: string;
    ownerId: string;
    status: 'active' | 'completed' | 'on-hold';
    progress: number;
    description?: string;
    tags?: string[];
    createdAt: string;
    updatedAt?: string;
}

// Invoice type
export interface Invoice {
    id: string;
    projectId: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
    createdAt: string;
    paidAt?: string;
}

// Support ticket type
export interface SupportTicket {
    id: string;
    title: string;
    message: string;
    status: 'open' | 'in-progress' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    authorId: string;
    createdAt: string;
    updatedAt?: string;
}

// Task type
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'completed';
    deadline: string;
    assignedTo: string;
    projectId: string;
    createdAt: string;
    updatedAt?: string;
}

// Chat message type
export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    projectId: string;
    message: string;
    timestamp: string;
}

// Document type
export interface Document {
    id: string;
    projectId: string;
    filename: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    uploadedBy: string;
    uploadedAt: string;
    folder?: string;
}

// Rating type
export interface Rating {
    id: string;
    companyId: string;
    userId: string;
    userName: string;
    score: number;
    comment: string;
    createdAt: string;
    updatedAt?: string;
}

// Service type (marketplace)
export interface Service {
    id: string;
    companyId: string;
    companyName: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    tags: string[];
    imageUrl?: string;
    featured?: boolean;
    createdAt: string;
    updatedAt?: string;
}
