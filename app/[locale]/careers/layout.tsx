import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'الوظائف المتاحة | انضم لفريق NovaArab',
    description: 'اكتشف فرص العمل المتاحة في NovaArab. نبحث عن مطورين ومصممين ومتخصصين تقنيين موهوبين للانضمام لفريقنا.',
    keywords: ['وظائف', 'توظيف', 'فرص عمل', 'مطورين', 'برمجة', 'تركيا'],
    openGraph: {
        title: 'الوظائف | NovaArab',
        description: 'انضم لفريقنا وابدأ مسيرتك المهنية',
        url: 'https://NovaArab.vercel.app/careers',
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
