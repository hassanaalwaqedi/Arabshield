/**
 * Chat Message Component
 * Displays individual message bubble with sender info
 */

'use client';

import { ChatMessage as ChatMessageType } from '@/lib/useDashboardData';
import { motion } from 'framer-motion';
import { Trash2, User } from 'lucide-react';
import { useState } from 'react';

interface ChatMessageProps {
    message: ChatMessageType;
    isOwnMessage: boolean;
    currentUserId: string;
    onDelete?: (messageId: string) => void;
}

export default function ChatMessage({
    message,
    isOwnMessage,
    currentUserId,
    onDelete
}: ChatMessageProps) {
    const [showDelete, setShowDelete] = useState(false);

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOwnMessage
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                    : 'bg-slate-200'
                }`}>
                <User size={16} className={isOwnMessage ? 'text-white' : 'text-slate-600'} />
            </div>

            {/* Message Bubble */}
            <div className={`flex-1 max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                {!isOwnMessage && (
                    <span className="text-xs font-medium text-slate-700 mb-1">
                        {message.senderName}
                    </span>
                )}

                <div className={`relative group flex items-center gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                    <div className={`px-4 py-2.5 rounded-2xl ${isOwnMessage
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                            : 'bg-white border border-slate-200 text-slate-900 rounded-bl-sm'
                        }`}>
                        <p className="text-sm whitespace-pre-wrap break-words">
                            {message.message}
                        </p>
                    </div>

                    {/* Delete Button (only for own messages) */}
                    {isOwnMessage && onDelete && showDelete && (
                        <button
                            onClick={() => onDelete(message.id)}
                            className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={14} className="text-red-600" />
                        </button>
                    )}
                </div>

                <span className={`text-xs text-slate-400 mt-1 ${isOwnMessage ? 'text-left' : 'text-right'}`}>
                    {formatTime(message.timestamp)}
                </span>
            </div>
        </motion.div>
    );
}
