'use client'

import React, { useState } from 'react'
import SectionHeading from '../SectionHeading'
import { Button } from '../ui/button'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { objectToArray } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  galleryImages: DataFromCollectionSlug<CollectionSlug>[]
}

const GalleryComponent = ({ galleryImages }: Props) => {
  const images = objectToArray(galleryImages)
  const [filter, setFilter] = useState('aurangabad');

  const FilteredImages = images.filter((item: any) => item.location === filter);
  const FilterByLocationImages = images.filter((item: any) => item.location);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <SectionHeading>Our Videos</SectionHeading>
        <div className="my-12 text-center flex justify-center">
          <Link href="https://www.youtube.com/@sambodhicompetitiveexamtra414/videos" target='_blank'>
            <img src='/api/media/file/youtubelogo.svg' alt='youtube' width={500} height={50} />
          </Link>
        </div>
        <SectionHeading>Our Gallery</SectionHeading>

        <div className="flex justify-center space-x-2 mb-8">
          {FilterByLocationImages.map((item: any) => (
            <Button
              key={item.id}
              onClick={() => setFilter(item.location)}
              variant={filter === item.category ? "default" : "outline"}
              className="capitalize"
            >
              {item.location}
            </Button>
          ))}
        </div>

        {FilteredImages.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
            <>
              {item.images.map((imageItem: any) => (
                <img
                  key={imageItem.id}
                  src={imageItem.image.url}
                  alt={imageItem.image.alt}
                  width={400}
                  height={400}
                />
              ))}
            </>
          </div>
        ))}
      </main>
    </div>
  )
}

export default GalleryComponent;