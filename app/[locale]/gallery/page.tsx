import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'
import GalleryComponent from '@/components/Gallery'


export default async function GalleryPage() {
   const payload = await getPayload({ config })
      const galleryImages = await payload.find({
              collection: 'galleries' as CollectionSlug,
              depth: 2
          })

  return (
    <GalleryComponent galleryImages={galleryImages.docs} />
  )
}