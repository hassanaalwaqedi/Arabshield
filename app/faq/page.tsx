import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our services, process, and pricing.',
};

export default function FAQPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-navy-900 text-white py-24 pb-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-tech-gradient opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Got questions? We've got answers. If you don't see what you're looking for, feel free to contact us.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                <FAQAccordion />
            </div>
        </div>
    );
}
