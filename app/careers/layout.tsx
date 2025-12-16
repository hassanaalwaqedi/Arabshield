import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'الوظائف المتاحة | انضم لفريق ArabShield',
    description: 'اكتشف فرص العمل المتاحة في ArabShield. نبحث عن مطورين ومصممين ومتخصصين تقنيين موهوبين للانضمام لفريقنا.',
    keywords: ['وظائف', 'توظيف', 'فرص عمل', 'مطورين', 'برمجة', 'تركيا'],
    openGraph: {
        title: 'الوظائف | ArabShield',
        description: 'انضم لفريقنا وابدأ مسيرتك المهنية',
        url: 'https://arabshield.vercel.app/careers',
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
