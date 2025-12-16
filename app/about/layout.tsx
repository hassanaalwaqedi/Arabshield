import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'من نحن | تعرف على فريق ArabShield',
    description: 'تعرف على قصة ArabShield ورؤيتنا ومهمتنا. فريق متخصص من المطورين والمبتكرين نخدم الشركات في تركيا والعالم العربي.',
    keywords: ['من نحن', 'فريق ArabShield', 'شركة برمجيات', 'تركيا', 'تطوير مواقع'],
    openGraph: {
        title: 'من نحن | ArabShield',
        description: 'تعرف على قصة ArabShield وفريقنا المتخصص',
        url: 'https://arabshield.vercel.app/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
