"use client";

import React, { useState } from "react";
import { objectToArray } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { Navigation, Pagination } from 'swiper/modules';
import ImageDialog from "./imageDialog";
import CustomImage from "@/utilities/CustomImage";
import { usePathname } from "next/navigation";

const Infrastructure = (galleryImages: DataFromCollectionSlug<CollectionSlug>[]) => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const galleryImageByCategory = objectToArray(galleryImages);
  const [filter, setFilter] = useState(locale == 'en' ? 'pune' : 'पुणे');
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
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>Gallery</SectionHeading>

        <div className="container p-0">
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

          <div className="swiper-container relative px-10">
            <Swiper
              modules={[Navigation, Pagination]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              navigation={{
                enabled: true,
                nextEl: '.custom-next',
                prevEl: '.custom-prev'
              }}
              scrollbar={{ draggable: true }}
              className="relative"
            >
              {FilteredImages.flatMap((category, categoryIndex) =>
                category.images.map((image: any, imageIndex: number) => (
                  <SwiperSlide key={image.id}>
                    <CustomImage
                      src={image.image.url}
                      alt={image.image.alt}
                      className="rounded-md object-fit mb-4 cursor-pointer h-64 w-full object-cover"
                      width={400}
                      height={400}
                      onClick={() => openModal(categoryIndex * category.images.length + imageIndex)}
                    />
                  </SwiperSlide>
                ))
              )}
            </Swiper>

            <button
              className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              className="custom-next absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image Dialog */}
      <ImageDialog isOpen={isOpen} setIsOpen={setIsOpen} selectedImageIndex={selectedImageIndex} nextImage={nextImage} previousImage={previousImage} allImages={allImages} />
      <div className="mt-8 text-center">
        <Link href="/gallery">
          <Button className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Infrastructure;