/**
 * Authorization Utility
 * 
 * Role-based access control for ArabShield
 * Roles: owner, member, client
 */

// User roles
export type UserRole = 'owner' | 'member' | 'client';

// Actions that can be performed
export type Action =
    // Project actions
    | 'read_projects'
    | 'write_projects'
    | 'delete_projects'
    // Task actions
    | 'read_tasks'
    | 'write_tasks'
    | 'delete_tasks'
    // Invoice actions
    | 'read_invoices'
    | 'write_invoices'
    // Document actions
    | 'read_documents'
    | 'write_documents'
    | 'delete_documents'
    // Ticket actions
    | 'read_tickets'
    | 'write_tickets'
    // Rating actions
    | 'read_ratings'
    | 'write_ratings'
    | 'delete_ratings'
    // Admin actions
    | 'manage_users'
    | 'view_all_data';

/**
 * Permission matrix defining what each role can do
 */
const permissions: Record<UserRole, Action[]> = {
    owner: [
        // Full access to everything
        'read_projects', 'write_projects', 'delete_projects',
        'read_tasks', 'write_tasks', 'delete_tasks',
        'read_invoices', 'write_invoices',
        'read_documents', 'write_documents', 'delete_documents',
        'read_tickets', 'write_tickets',
        'read_ratings', 'write_ratings', 'delete_ratings',
        'manage_users', 'view_all_data'
    ],
    member: [
        // Can read and write most things, but not delete or manage users
        'read_projects', 'write_projects',
        'read_tasks', 'write_tasks',
        'read_invoices',
        'read_documents', 'write_documents',
        'read_tickets', 'write_tickets',
        'read_ratings', 'write_ratings'
    ],
    client: [
        // Read-only access to own data, can write tickets and ratings
        'read_projects',
        'read_tasks',
        'read_invoices',
        'read_documents',
        'read_tickets', 'write_tickets',
        'read_ratings', 'write_ratings', 'delete_ratings'
    ]
};

/**
 * Check if a role has permission to perform an action
 * @param role - User's role
 * @param action - Action to check
 * @returns boolean indicating if action is allowed
 */
export function canAccess(role: UserRole | null, action: Action): boolean {
    if (!role) return false;
    return permissions[role]?.includes(action) ?? false;
}

/**
 * Check if user can perform multiple actions (all must be allowed)
 * @param role - User's role
 * @param actions - Array of actions to check
 * @returns boolean indicating if all actions are allowed
 */
export function canAccessAll(role: UserRole | null, actions: Action[]): boolean {
    if (!role) return false;
    return actions.every(action => canAccess(role, action));
}

/**
 * Check if user can perform any of the actions
 * @param role - User's role
 * @param actions - Array of actions to check
 * @returns boolean indicating if any action is allowed
 */
export function canAccessAny(role: UserRole | null, actions: Action[]): boolean {
    if (!role) return false;
    return actions.some(action => canAccess(role, action));
}

/**
 * Get all actions a role can perform
 * @param role - User's role
 * @returns Array of allowed actions
 */
export function getAllowedActions(role: UserRole | null): Action[] {
    if (!role) return [];
    return permissions[role] ?? [];
}

/**
 * Check if role is an admin-level role (owner)
 * @param role - User's role
 * @returns boolean
 */
export function isAdmin(role: UserRole | null): boolean {
    return role === 'owner';
}

/**
 * Default role for new users
 */
export const DEFAULT_ROLE: UserRole = 'client';
