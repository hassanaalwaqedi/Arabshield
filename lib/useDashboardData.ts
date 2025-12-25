'use client';

/**
 * Dashboard Data Hooks
 * 
 * BACKWARD COMPATIBILITY FILE
 * 
 * This file re-exports all dashboard hooks, types, and helpers from the
 * modular lib/dashboard/ directory structure. Existing imports will
 * continue to work without modification.
 * 
 * For new code, prefer importing directly from '@/lib/dashboard':
 *   import { useDashboardStats, type Project } from '@/lib/dashboard';
 * 
 * Module Structure:
 *   - lib/dashboard/types.ts    - TypeScript interfaces
 *   - lib/dashboard/helpers.ts  - Utility functions
 *   - lib/dashboard/hooks.ts    - React hooks
 *   - lib/dashboard/index.ts    - Barrel export
 */

// Re-export everything from the dashboard module
export * from './dashboard';
