import { CollectionSlug, getPayload } from 'payload';
import React from 'react'
import config from '@payload-config';
import BlockRenderer from '@/blocks/BlockRenderer';


const CoursePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const CourseContent = await payload.find({
        collection: 'courses' as CollectionSlug,
        depth: 2,
        where: {
            'slug': {
                equals: slug,
            },
        },
    }) as unknown as { docs: { content: any }[] }

    return (
        <div className='container mx-auto px-4 py-8'>
            <BlockRenderer blocks={CourseContent.docs[0]?.content} />
        </div>
    )
}

export default CoursePage;