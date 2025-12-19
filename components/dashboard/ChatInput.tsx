/**
 * Chat Input Component
 * Text input for sending messages
 */

'use client';

import { Send, Loader2 } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
    onSend: (message: string) => Promise<void>;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!message.trim() || sending) return;

        setSending(true);
        try {
            await onSend(message.trim());
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex gap-2 items-end p-4 bg-white border-t border-slate-200">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب رسالتك هنا..."
                disabled={disabled || sending}
                rows={1}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-muted-foreground focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none max-h-32"
                style={{ minHeight: '48px' }}
            />
            <button
                onClick={handleSend}
                disabled={!message.trim() || sending || disabled}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-foreground rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
                {sending ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span className="hidden sm:inline">جاري الإرسال...</span>
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        <span className="hidden sm:inline">إرسال</span>
                    </>
                )}
            </button>
        </div>
    );
}
