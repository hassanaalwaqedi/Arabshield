import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'المشاكل الشائعة | حلول سريعة',
    description: 'حلول للمشاكل الشائعة في ArabShield. ابحث عن مشكلتك واحصل على الحل فوراً. 80+ مشكلة موثقة مع حلولها.',
    keywords: ['مشاكل شائعة', 'حلول', 'دعم فني', 'استكشاف الأخطاء', 'ArabShield'],
    openGraph: {
        title: 'المشاكل الشائعة | ArabShield',
        description: 'حلول سريعة للمشاكل المتكررة',
        url: 'https://arabshield.vercel.app/issues',
    },
};

export default function IssuesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
