import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'تواصل معنا | ArabShield',
    description: 'تواصل مع فريق ArabShield. نحن هنا للإجابة على استفساراتك ومساعدتك في بدء مشروعك التقني.',
    keywords: ['تواصل', 'اتصل بنا', 'دعم', 'استفسارات', 'عروض أسعار'],
    openGraph: {
        title: 'تواصل معنا | ArabShield',
        description: 'نحن هنا لمساعدتك',
        url: 'https://arabshield.vercel.app/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
