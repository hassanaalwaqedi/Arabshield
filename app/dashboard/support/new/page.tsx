'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function NewSupportTicketPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setError('يجب تسجيل الدخول لإنشاء تذكرة');
            return;
        }

        if (!title.trim() || !message.trim()) {
            setError('الرجاء ملء جميع الحقول');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await addDoc(collection(db, 'tickets'), {
                title: title.trim(),
                message: message.trim(),
                priority,
                status: 'open',
                authorId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            router.push('/dashboard/support');
        } catch (err) {
            console.error('Error creating ticket:', err);
            setError('حدث خطأ أثناء إنشاء التذكرة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-abyss-50 via-electric-50/20 to-cyan-50/30 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-abyss-600 hover:text-electric-600 transition-colors mb-4"
                    >
                        <ArrowRight className="h-4 w-4" />
                        <span>رجوع</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-2xl shadow-lg">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-abyss-900">تذكرة دعم جديدة</h1>
                            <p className="text-abyss-600">أخبرنا كيف يمكننا مساعدتك</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-abyss-200/50 p-8">
                    {error && (
                        <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                            <AlertCircle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-abyss-700 mb-2">
                                عنوان التذكرة
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="مثال: مشكلة في الدفع"
                                className="w-full px-4 py-3 rounded-xl border border-abyss-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 transition-all outline-none"
                                required
                            />
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-semibold text-abyss-700 mb-2">
                                الأولوية
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { value: 'low', label: 'منخفضة', color: 'bg-green-100 text-green-700 border-green-300' },
                                    { value: 'medium', label: 'متوسطة', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
                                    { value: 'high', label: 'عالية', color: 'bg-red-100 text-red-700 border-red-300' }
                                ].map((p) => (
                                    <button
                                        key={p.value}
                                        type="button"
                                        onClick={() => setPriority(p.value as 'low' | 'medium' | 'high')}
                                        className={`px-4 py-2 rounded-xl border-2 font-medium transition-all ${priority === p.value
                                                ? p.color + ' shadow-lg scale-105'
                                                : 'bg-white text-abyss-600 border-abyss-200 hover:border-abyss-300'
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-semibold text-abyss-700 mb-2">
                                تفاصيل المشكلة
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="اشرح مشكلتك بالتفصيل..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-abyss-200 focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 transition-all outline-none resize-none"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-electric-500 via-electric-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold shadow-xl shadow-electric-500/30 hover:shadow-2xl hover:shadow-electric-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'جاري الإرسال...' : 'إرسال التذكرة'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
