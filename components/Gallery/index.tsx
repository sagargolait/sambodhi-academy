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
  const galleryImageByCategory = objectToArray(galleryImages);
  const [filter, setFilter] = useState('Chhatrapati Sambhaji Nagar');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get all unique types and locations
  const getFilterOptions = () => {
    const filterOptions = new Set<string>();

    galleryImageByCategory.forEach((item: any) => {
      // Add the type
      if (item.type !== 'Hero' && item.type !== 'Location')
        filterOptions.add(item.type);

      // If type is Location, also add the location
      if (item.type === 'Location') {
        filterOptions.add(item.location);
      }
    });

    return Array.from(filterOptions);
  };

  // Filter images based on selected filter
  const getFilteredImages = () => {
    return galleryImageByCategory.filter((item: any) =>
      item.type === filter || // Match by type
      (item.type === 'Location' && item.location === filter) // Match by location if it's a Location type
    );
  };

  const FilteredImages = getFilteredImages();
  const allImages = FilteredImages.flatMap(category => category.images);
  const filterOptions = getFilterOptions();

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <SectionHeading>OurVideos</SectionHeading>
        <div className="my-12 text-center flex justify-center">
          <Link href="https://www.youtube.com/@sambodhicompetitiveexamtra414/videos" target='_blank'>
            <Image src='/api/media/file/youtubelogo.svg' alt='youtube' width={500} height={50} />
          </Link>
        </div>
        <SectionHeading>OurGallery</SectionHeading>

        <div className="flex flex-wrap gap-3 justify-center space-x-2 mb-8">
          {filterOptions.map((item: any, index) => (
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