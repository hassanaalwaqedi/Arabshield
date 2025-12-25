/**
 * Dashboard Helpers Tests
 * 
 * Unit tests for formatting and styling helper functions.
 */

import { formatRelativeTime, getActivityStyle } from '../lib/dashboard/helpers';

describe('formatRelativeTime', () => {
    beforeEach(() => {
        // Mock the current date to ensure consistent tests
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-12-25T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('returns "Just now" for timestamps less than 1 minute ago', () => {
        const timestamp = new Date('2024-12-25T11:59:30Z').toISOString();
        expect(formatRelativeTime(timestamp)).toBe('Just now');
    });

    test('returns minutes ago for timestamps less than 1 hour ago', () => {
        const timestamp = new Date('2024-12-25T11:30:00Z').toISOString();
        expect(formatRelativeTime(timestamp)).toBe('30 دقيقة مضت');
    });

    test('returns hours ago for timestamps less than 24 hours ago', () => {
        const timestamp = new Date('2024-12-25T06:00:00Z').toISOString();
        expect(formatRelativeTime(timestamp)).toBe('6 ساعة مضت');
    });

    test('returns days ago for timestamps less than 7 days ago', () => {
        const timestamp = new Date('2024-12-22T12:00:00Z').toISOString();
        expect(formatRelativeTime(timestamp)).toBe('3 يوم مضى');
    });

    test('returns formatted date for timestamps more than 7 days ago', () => {
        const timestamp = new Date('2024-12-10T12:00:00Z').toISOString();
        const result = formatRelativeTime(timestamp);
        // Should be a localized date string (ar-SA format)
        expect(typeof result).toBe('string');
        expect(result).not.toContain('مضت');
    });
});

describe('getActivityStyle', () => {
    test('returns blue style for order_created', () => {
        const style = getActivityStyle('order_created');
        expect(style.color).toBe('blue');
        expect(style.gradient).toBe('from-blue-500 to-cyan-600');
    });

    test('returns green style for order_completed', () => {
        const style = getActivityStyle('order_completed');
        expect(style.color).toBe('green');
        expect(style.gradient).toBe('from-green-500 to-emerald-600');
    });

    test('returns green style for order_updated', () => {
        const style = getActivityStyle('order_updated');
        expect(style.color).toBe('green');
    });

    test('returns electric style for payment_received', () => {
        const style = getActivityStyle('payment_received');
        expect(style.color).toBe('electric');
        expect(style.gradient).toBe('from-electric-500 to-cyan-600');
    });

    test('returns orange style for ticket_opened', () => {
        const style = getActivityStyle('ticket_opened');
        expect(style.color).toBe('orange');
    });

    test('returns green style for ticket_resolved', () => {
        const style = getActivityStyle('ticket_resolved');
        expect(style.color).toBe('green');
    });

    test('returns default purple style for unknown type', () => {
        const style = getActivityStyle('unknown_type');
        expect(style.color).toBe('purple');
        expect(style.gradient).toBe('from-purple-500 to-pink-600');
    });

    test('returns default style for empty string', () => {
        const style = getActivityStyle('');
        expect(style.color).toBe('purple');
    });
});
