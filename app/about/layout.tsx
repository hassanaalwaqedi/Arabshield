import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'من نحن | تعرف على فريق NovaArab',
    description: 'تعرف على قصة NovaArab ورؤيتنا ومهمتنا. فريق متخصص من المطورين والمبتكرين نخدم الشركات في تركيا والعالم العربي.',
    keywords: ['من نحن', 'فريق NovaArab', 'شركة برمجيات', 'تركيا', 'تطوير مواقع'],
    openGraph: {
        title: 'من نحن | NovaArab',
        description: 'تعرف على قصة NovaArab وفريقنا المتخصص',
        url: 'https://NovaArab.vercel.app/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
