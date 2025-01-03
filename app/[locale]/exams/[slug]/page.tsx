import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'
import BlockRenderer from '@/blocks/BlockRenderer';

export default async function ExamsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config })

  const blocks = await payload.find({
    collection: 'exam-pages' as CollectionSlug,
    depth: 2,
    where: {
      'slug': {
        equals: slug,
      },
    },
  }) as unknown as { docs: { content: any }[] };


  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <BlockRenderer blocks={blocks.docs[0]?.content} />
    </div>
  );
}
