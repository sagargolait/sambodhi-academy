import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'
import GalleryComponent from '@/components/Gallery'
type Props = {
  params: Promise<{ locale: string }>
}

export default async function GalleryPage({ params }: Props) {
  const payload = await getPayload({ config })
  const { locale } = await params

  const galleryImages = await payload.find({
    collection: 'galleries' as CollectionSlug,
    locale: locale as any,
    depth: 2
  })

  return (
    <GalleryComponent galleryImages={galleryImages.docs} />
  )
}