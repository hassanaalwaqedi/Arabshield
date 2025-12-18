import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'خدماتنا | تطوير مواقع وتطبيقات وأمن سيبراني',
    description: 'نقدم خدمات تطوير مواقع احترافية، تطبيقات الجوال، حلول الأمن السيبراني، والذكاء الاصطناعي للأعمال. حلول تقنية متكاملة للشركات.',
    keywords: ['تطوير مواقع', 'تطبيقات الجوال', 'أمن سيبراني', 'ذكاء اصطناعي', 'خدمات برمجية'],
    openGraph: {
        title: 'خدماتنا | NovaArab',
        description: 'تطوير مواقع، تطبيقات، أمن سيبراني، وذكاء اصطناعي',
        url: 'https://NovaArab.vercel.app/services',
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
