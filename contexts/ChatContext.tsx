'use client';

/**
 * Chat Context for ArabShield Chatbot
 * Manages chat state, message history, and response generation
 */

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { findAnswer, fallbackResponse, suggestedQuestions, KnowledgeEntry } from '@/lib/knowledgeBase';

export interface ChatMessage {
    id: string;
    type: 'user' | 'bot';
    text: string;
    links?: { text: string; url: string }[];
    timestamp: Date;
}

interface ChatContextValue {
    messages: ChatMessage[];
    isOpen: boolean;
    isTyping: boolean;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    sendMessage: (text: string) => void;
    clearMessages: () => void;
    suggestedQuestions: string[];
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const openChat = useCallback(() => {
        setIsOpen(true);
        // Add welcome message if no messages
        if (messages.length === 0) {
            setMessages([{
                id: 'welcome',
                type: 'bot',
                text: `أهلاً وسهلاً! 👋\nأنا مساعد ArabShield، كيف يمكنني مساعدتك اليوم?`,
                timestamp: new Date()
            }]);
        }
    }, [messages.length]);

    const closeChat = useCallback(() => setIsOpen(false), []);
    const toggleChat = useCallback(() => {
        if (!isOpen) {
            openChat();
        } else {
            closeChat();
        }
    }, [isOpen, openChat, closeChat]);

    const sendMessage = useCallback((text: string) => {
        if (!text.trim()) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            type: 'user',
            text: text.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        // Simulate typing delay for natural feel
        setTimeout(() => {
            const match = findAnswer(text);

            const botMessage: ChatMessage = {
                id: `bot-${Date.now()}`,
                type: 'bot',
                text: match ? match.answer : fallbackResponse.answer,
                links: match?.links || fallbackResponse.links,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 800 + Math.random() * 500); // 800-1300ms delay
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([{
            id: 'welcome',
            type: 'bot',
            text: `أهلاً وسهلاً! 👋\nأنا مساعد ArabShield، كيف يمكنني مساعدتك اليوم?`,
            timestamp: new Date()
        }]);
    }, []);

    return (
        <ChatContext.Provider value={{
            messages,
            isOpen,
            isTyping,
            openChat,
            closeChat,
            toggleChat,
            sendMessage,
            clearMessages,
            suggestedQuestions
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
