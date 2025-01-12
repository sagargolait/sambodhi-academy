import { CollectionSlug, getPayload } from 'payload';
import React from 'react'
import config from '@payload-config';
import RichText from '@/blocks/RichText';


const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const articleContent = await payload.find({
        collection: 'articles' as CollectionSlug,
        depth: 2,
        where: {
            'slug': {
                equals: slug,
            },
        },
    }) as unknown as { docs: { content: any }[] }

    return (
        <div className='container mx-auto px-4 py-8'><RichText content={articleContent.docs[0]?.content} /></div>
    )
}

export default ArticlePage