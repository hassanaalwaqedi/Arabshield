/**
 * Admin Utilities
 * Functions for admin access checking and authorization
 * 
 * IMPORTANT: These are UI-level checks only.
 * Firestore rules are the final authority for security.
 */

import { User } from 'firebase/auth';

/**
 * Admin roles that have full system access
 */
export const ADMIN_ROLES = ['owner', 'admin'] as const;
export type AdminRole = typeof ADMIN_ROLES[number];
export type UserRole = AdminRole | 'client' | 'member';

/**
 * Check if a role is an admin role
 */
export function isAdminRole(role: string | null | undefined): boolean {
    if (!role) return false;
    return ADMIN_ROLES.includes(role as AdminRole);
}

/**
 * Check if the current user has admin privileges
 * Based on role from AuthContext
 */
export function hasAdminPrivileges(role: string | null | undefined): boolean {
    return isAdminRole(role);
}

/**
 * User interface for admin panel
 */
export interface AdminUser {
    uid: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string | Date;
    emailVerified?: boolean;
    lastLogin?: string | Date;
}

/**
 * System settings interface
 */
export interface SystemSettings {
    siteName: string;
    maintenanceMode: boolean;
    allowNewRegistrations: boolean;
    defaultUserRole: UserRole;
    emailNotificationsEnabled: boolean;
    maxProjectsPerUser: number;
}

/**
 * Default system settings
 */
export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
    siteName: 'ArabShield',
    maintenanceMode: false,
    allowNewRegistrations: true,
    defaultUserRole: 'client',
    emailNotificationsEnabled: false,
    maxProjectsPerUser: 10,
};
