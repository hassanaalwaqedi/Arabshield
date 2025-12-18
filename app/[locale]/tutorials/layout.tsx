import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'دروس الفيديو | تعلم خطوة بخطوة',
    description: 'دروس فيديو تعليمية من المبتدئ إلى المحترف. تعلم تطوير الويب والتطبيقات مع NovaArab. 45+ درس فيديو.',
    keywords: ['دروس فيديو', 'تعلم البرمجة', 'React', 'Next.js', 'Firebase', 'NovaArab'],
    openGraph: {
        title: 'دروس الفيديو | NovaArab',
        description: 'تعلم بالمشاهدة مع دروس فيديو احترافية',
        url: 'https://NovaArab.vercel.app/tutorials',
    },
};

export default function TutorialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
