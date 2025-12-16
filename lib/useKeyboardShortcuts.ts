'use client';

/**
 * useKeyboardShortcuts Hook
 * Provides keyboard shortcut handling for common actions
 */

import { useEffect, useCallback } from 'react';

interface ShortcutHandler {
    key: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    handler: () => void;
    description?: string;
}

export function useKeyboardShortcut(
    key: string,
    handler: () => void,
    options?: {
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        enabled?: boolean;
    }
) {
    const { ctrlKey = false, shiftKey = false, altKey = false, enabled = true } = options || {};

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            // Don't trigger if user is typing in an input
            const target = event.target as HTMLElement;
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            ) {
                // Allow Escape even in inputs
                if (key.toLowerCase() !== 'escape') return;
            }

            const keyMatches = event.key.toLowerCase() === key.toLowerCase();
            const ctrlMatches = ctrlKey ? (event.ctrlKey || event.metaKey) : true;
            const shiftMatches = shiftKey ? event.shiftKey : true;
            const altMatches = altKey ? event.altKey : true;

            if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
                event.preventDefault();
                handler();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, ctrlKey, shiftKey, altKey, handler, enabled]);
}

/**
 * Hook for ESC key to close modals
 */
export function useEscapeKey(handler: () => void, enabled: boolean = true) {
    useKeyboardShortcut('Escape', handler, { enabled });
}

/**
 * Hook for common keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            const isInput =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable;

            for (const shortcut of shortcuts) {
                // Skip non-escape shortcuts if in input
                if (isInput && shortcut.key.toLowerCase() !== 'escape') continue;

                const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
                const ctrlMatches = shortcut.ctrlKey ? (event.ctrlKey || event.metaKey) : !event.ctrlKey;
                const shiftMatches = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
                const altMatches = shortcut.altKey ? event.altKey : !event.altKey;

                if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
                    event.preventDefault();
                    shortcut.handler();
                    break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
}
