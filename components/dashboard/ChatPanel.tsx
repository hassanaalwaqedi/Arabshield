/**
 * Chat Panel Component
 * Main chat interface with messages list and input
 */

'use client';

import { useProjectMessages } from '@/lib/useDashboardData';
import { sendMessage, deleteMessage } from '@/lib/chatService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { motion } from 'framer-motion';
import { MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ChatPanelProps {
    projectId: string;
    currentUserId: string;
    currentUserName: string;
}

export default function ChatPanel({ projectId, currentUserId, currentUserName }: ChatPanelProps) {
    const { messages, loading, error } = useProjectMessages(projectId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (autoScroll && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, autoScroll]);

    const handleSendMessage = async (message: string) => {
        await sendMessage(projectId, currentUserId, currentUserName, message);
    };

    const handleDeleteMessage = async (messageId: string) => {
        if (confirm('هل تريد حذف هذه الرسالة؟')) {
            await deleteMessage(projectId, messageId);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200">
                <div className="flex items-center justify-center flex-1">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200">
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-white/50">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageCircle className="text-blue-600" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">محادثة المشروع</h3>
                    <p className="text-xs text-slate-500">
                        {messages.length} {messages.length === 1 ? 'رسالة' : 'رسائل'}
                    </p>
                </div>
            </div>

            {/* Messages List */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-2"
                onScroll={(e) => {
                    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
                    setAutoScroll(isAtBottom);
                }}
            >
                {messages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full py-12"
                    >
                        <MessageCircle size={48} className="text-slate-300 mb-4" />
                        <p className="text-slate-500">لا توجد رسائل بعد</p>
                        <p className="text-sm text-slate-400 mt-2">ابدأ المحادثة بإرسال رسالة</p>
                    </motion.div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                isOwnMessage={message.senderId === currentUserId}
                                currentUserId={currentUserId}
                                onDelete={handleDeleteMessage}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSendMessage} />
        </div>
    );
}
