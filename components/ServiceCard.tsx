import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 group h-full flex flex-col">
            <div className="w-14 h-14 bg-tech-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tech-blue transition-colors duration-300">
                <Icon className="h-7 w-7 text-tech-blue group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
            <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                {description}
            </p>
            <Link href={href} className="inline-flex items-center text-tech-blue font-semibold hover:text-navy-900 transition-colors mt-auto">
                Learn more <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
