import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'تواصل معنا | NovaArab',
    description: 'تواصل مع فريق NovaArab. نحن هنا للإجابة على استفساراتك ومساعدتك في بدء مشروعك التقني.',
    keywords: ['تواصل', 'اتصل بنا', 'دعم', 'استفسارات', 'عروض أسعار'],
    openGraph: {
        title: 'تواصل معنا | NovaArab',
        description: 'نحن هنا لمساعدتك',
        url: 'https://NovaArab.vercel.app/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
