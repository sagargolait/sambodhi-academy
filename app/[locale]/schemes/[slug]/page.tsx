import { CollectionSlug, getPayload } from 'payload';
import BlockRenderer from '@/blocks/BlockRenderer'
import React from 'react'
import config from '@payload-config';
import Custom404 from '../../../not-found';


const SchemesPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const SchemesContent = await payload.find({
        collection: 'government-schemes' as CollectionSlug,
        depth: 2,
        where: {
            'slug': {
                equals: slug,
            },
        },
    }) as unknown as { docs: { content: any }[] }

    if (SchemesContent.docs.length === 0) {
        return <div><Custom404 /></div>
    }

    return (
        <div><BlockRenderer blocks={SchemesContent.docs[0]?.content} /></div>
    )
}

export default SchemesPage