import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'الأسعار | باقات وخطط الأسعار',
    description: 'اكتشف باقات وخطط الأسعار المرنة لخدمات ArabShield. من المشاريع الصغيرة إلى الحلول المؤسسية الكاملة.',
    keywords: ['أسعار', 'باقات', 'خطط الأسعار', 'تكلفة تطوير مواقع', 'عروض برمجة'],
    openGraph: {
        title: 'الأسعار | ArabShield',
        description: 'باقات مرنة تناسب جميع احتياجاتك',
        url: 'https://arabshield.vercel.app/pricing',
    },
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
