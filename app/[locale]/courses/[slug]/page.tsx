import { CollectionSlug, getPayload } from 'payload';
import React from 'react'
import config from '@payload-config';
import BlockRenderer from '@/blocks/BlockRenderer';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string, locale: string }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const payload = await getPayload({ config });

    const { docs } = await payload.find({
        collection: 'courses' as CollectionSlug,
        depth: 2,
        locale: locale as any,
        where: {
            slug: { equals: slug },
        },
    }) as unknown as { docs: { title?: string; description?: string, meta?: any }[] };

    const page = docs[0];

    return {
        title: page?.title || 'SambodhiAcademy | Exams',
        description: page?.meta?.description || 'Find information about exams',
        keywords: page?.meta?.keywords || '',
        openGraph: {
            title: page?.title || 'Exams',
            description: page?.meta?.description || 'Find information about exams',
            type: 'website',
        },
    };
}

const CoursePage = async ({ params }: Props) => {
    const { slug, locale } = await params;
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
        collection: 'courses' as CollectionSlug,
        depth: 2,
        locale: locale as any,
        where: {
            slug: { equals: slug },
        },
    }) as unknown as { docs: { content: any }[] };

    return (
        <div className='container mx-auto px-4 py-8'>
            <BlockRenderer blocks={docs[0]?.content} />
        </div>
    )
}

export default CoursePage;