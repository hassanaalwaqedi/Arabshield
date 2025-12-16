import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'دروس الفيديو | تعلم خطوة بخطوة',
    description: 'دروس فيديو تعليمية من المبتدئ إلى المحترف. تعلم تطوير الويب والتطبيقات مع ArabShield. 45+ درس فيديو.',
    keywords: ['دروس فيديو', 'تعلم البرمجة', 'React', 'Next.js', 'Firebase', 'ArabShield'],
    openGraph: {
        title: 'دروس الفيديو | ArabShield',
        description: 'تعلم بالمشاهدة مع دروس فيديو احترافية',
        url: 'https://arabshield.vercel.app/tutorials',
    },
};

export default function TutorialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
