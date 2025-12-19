"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "What industries do you specialize in?",
        answer: "We work with clients across various sectors including FinTech, Healthcare, E-commerce, Education, and Government. Our team has deep domain expertise to deliver tailored solutions for your industry."
    },
    {
        question: "How do you ensure project quality?",
        answer: "We follow a rigorous Quality Assurance process including automated testing, code reviews, and user acceptance testing (UAT). We also assign a dedicated project manager to ensure everything meets your milestones and requirements."
    },
    {
        question: "Can you help update an existing website or app?",
        answer: "Absolutely. We specialize in digital modernization. We can audit your current systems, recommend improvements, and implement upgrades to improve performance, security, and user experience."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes, we provide comprehensive post-launch support and maintenance packages. We ensure your application stays secure, compatible with new devices, and continues to perform optimally."
    },
    {
        question: "What is your payment process?",
        answer: "Typically, we work with a milestone-based payment structure. This ensures transparency and aligns payment with project progress. We'll detail this in your project proposal."
    }
];

export function FAQAccordion() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
                    <button
                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                        <span className={`font-semibold text-lg ${activeIndex === index ? 'text-tech-blue' : 'text-navy-900'}`}>{faq.question}</span>
                        {activeIndex === index ? (
                            <Minus className="h-5 w-5 text-tech-blue" />
                        ) : (
                            <Plus className="h-5 w-5 text-muted-foreground" />
                        )}
                    </button>
                    <AnimatePresence>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
