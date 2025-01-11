'use client'

import React, { useState } from 'react'
import SectionHeading from '../SectionHeading'
import { Button } from '../ui/button'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { objectToArray } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import ImageDialog from '../imageDialog'

type Props = {
  galleryImages: DataFromCollectionSlug<CollectionSlug>[]
}

const GalleryComponent = ({ galleryImages }: Props) => {
  const images = objectToArray(galleryImages)
  const [filter, setFilter] = useState('Chhatrapati Sambhaji Nagar');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const FilteredImages = images.filter((item: any) => item.location === filter);
  const allImages = FilteredImages.flatMap(category => category.images);
  const FilterByLocationImages = images.filter((item: any) => item.location);
  const uniqueLocations = new Set(FilterByLocationImages.map((item: any) => item.location));

  const uniqueLocationArray = Array.from(uniqueLocations)
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <SectionHeading>Our Videos</SectionHeading>
        <div className="my-12 text-center flex justify-center">
          <Link href="https://www.youtube.com/@sambodhicompetitiveexamtra414/videos" target='_blank'>
            <Image src='/api/media/file/youtubelogo.svg' alt='youtube' width={500} height={50} />
          </Link>
        </div>
        <SectionHeading>Our Gallery</SectionHeading>

        <div className="flex justify-center space-x-2 mb-8">
          {uniqueLocationArray.map((item: any, index) => (
            <Button
              key={index}
              onClick={() => setFilter(item)}
              variant={filter === item ? "default" : "outline"}
              className="capitalize"
            >
              {item}
            </Button>
          ))}
        </div>

        {FilteredImages.map((item, categoryIndex) => (
          <div key={item.id} className="grid grid-cols-3 gap-6 justify-items-center w-full">
            <>
              {item.images.map((imageItem: any, imageIndex: any) => (
                <Image
                  key={imageItem.id}
                  src={imageItem.image.url}
                  alt={imageItem.image.alt}
                  width={400}
                  height={400}
                  onClick={() => openModal(categoryIndex * item.images.length + imageIndex)}
                />
              ))}
            </>
          </div>
        ))}
      </main>
      <ImageDialog isOpen={isOpen} setIsOpen={setIsOpen} selectedImageIndex={selectedImageIndex} nextImage={nextImage} previousImage={previousImage} allImages={allImages} />
    </div>
  )
}

export default GalleryComponent;