import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'التوثيق | أدلة ومراجع API',
    description: 'توثيق شامل لـ NovaArab. أدلة البداية، المفاهيم الأساسية، مرجع API، ومواضيع متقدمة. 150+ مقالة تعليمية.',
    keywords: ['توثيق', 'API', 'أدلة', 'تعلم البرمجة', 'NovaArab'],
    openGraph: {
        title: 'التوثيق | NovaArab',
        description: 'كل ما تحتاج معرفته لبناء تطبيقات احترافية',
        url: 'https://NovaArab.vercel.app/docs',
    },
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
