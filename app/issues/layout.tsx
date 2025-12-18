import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'المشاكل الشائعة | حلول سريعة',
    description: 'حلول للمشاكل الشائعة في NovaArab. ابحث عن مشكلتك واحصل على الحل فوراً. 80+ مشكلة موثقة مع حلولها.',
    keywords: ['مشاكل شائعة', 'حلول', 'دعم فني', 'استكشاف الأخطاء', 'NovaArab'],
    openGraph: {
        title: 'المشاكل الشائعة | NovaArab',
        description: 'حلول سريعة للمشاكل المتكررة',
        url: 'https://NovaArab.vercel.app/issues',
    },
};

export default function IssuesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
