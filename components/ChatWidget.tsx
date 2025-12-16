'use client';

/**
 * Chat Widget Component for ArabShield
 * Floating chat bubble with full chat interface
 * RTL Arabic support, animations, and link handling
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    MessageCircle,
    X,
    Send,
    Bot,
    User,
    Sparkles,
    ExternalLink,
    RotateCcw,
    Minimize2
} from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

export function ChatWidget() {
    const {
        messages,
        isOpen,
        isTyping,
        toggleChat,
        closeChat,
        sendMessage,
        clearMessages,
        suggestedQuestions
    } = useChat();

    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleSuggestion = (question: string) => {
        sendMessage(question);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleChat}
                        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-white hover:shadow-xl hover:shadow-blue-600/40 transition-shadow"
                        aria-label="فتح المحادثة"
                    >
                        <MessageCircle className="w-6 h-6" />

                        {/* Pulse animation */}
                        <span className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        dir="rtl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">مساعد ArabShield</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-white/80 text-xs">متصل الآن</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearMessages}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="مسح المحادثة"
                                >
                                    <RotateCcw className="w-4 h-4 text-white/80" />
                                </button>
                                <button
                                    onClick={closeChat}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="إغلاق المحادثة"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                                            {/* Avatar */}
                                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.type === 'user'
                                                    ? 'bg-blue-600'
                                                    : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                                }`}>
                                                {message.type === 'user'
                                                    ? <User className="w-4 h-4 text-white" />
                                                    : <Sparkles className="w-4 h-4 text-white" />
                                                }
                                            </div>

                                            {/* Message Bubble */}
                                            <div className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-md'
                                                    : 'bg-slate-800 text-slate-200 rounded-bl-md'
                                                }`}>
                                                <p className="text-sm whitespace-pre-line leading-relaxed">
                                                    {message.text}
                                                </p>

                                                {/* Links */}
                                                {message.links && message.links.length > 0 && (
                                                    <div className="mt-3 pt-2 border-t border-white/10 space-y-2">
                                                        {message.links.map((link, idx) => (
                                                            <Link
                                                                key={idx}
                                                                href={link.url}
                                                                className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                                                onClick={closeChat}
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                                <span>{link.text}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator */}
                            <AnimatePresence>
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex justify-end"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        {messages.length <= 1 && (
                            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800">
                                <p className="text-xs text-slate-500 mb-2">اقتراحات:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedQuestions.map((question, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSuggestion(question)}
                                            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 transition-colors"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-800">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="اكتب رسالتك..."
                                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500 hover:to-purple-500 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
