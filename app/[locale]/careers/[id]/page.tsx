import type { Metadata } from 'next';
import { getJobByIdServer, serverJobTypeLabels, serverDepartmentLabels } from '@/lib/firebase/server';
import JobDetailsClient from './JobDetailsClient';

interface PageProps {
    params: Promise<{ id: string; locale: string }>;
}

// Generate dynamic metadata for each job
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id, locale } = await params;
    const job = await getJobByIdServer(id);
    const siteUrl = 'https://arabshield.vercel.app';

    if (!job) {
        return {
            title: 'الوظيفة غير موجودة | NovaArab',
            description: 'لم يتم العثور على هذه الوظيفة',
        };
    }

    const isArabic = locale === 'ar';
    const jobType = serverJobTypeLabels[job.type] || job.type;
    const department = serverDepartmentLabels[job.department] || job.department;

    const title = `${job.title} | وظائف NovaArab`;
    const description = isArabic
        ? `فرصة عمل: ${job.title} في قسم ${department}. الموقع: ${job.location}. نوع العمل: ${jobType}. تقدم الآن!`
        : `Job Opening: ${job.title} in ${department}. Location: ${job.location}. Type: ${jobType}. Apply now!`;

    return {
        title,
        description,
        openGraph: {
            type: 'website',
            siteName: 'NovaArab',
            title: `${job.title} - وظائف NovaArab`,
            description,
            url: `${siteUrl}/${locale}/careers/${id}`,
            images: [
                {
                    url: `${siteUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${job.title} - NovaArab`,
                },
            ],
            locale: locale === 'ar' ? 'ar_SA' : locale === 'tr' ? 'tr_TR' : 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${job.title} - وظائف NovaArab`,
            description,
            images: [`${siteUrl}/og-image.png`],
        },
    };
}

export default async function JobDetailsPage({ params }: PageProps) {
    const { id } = await params;
    return <JobDetailsClient jobId={id} />;
}
