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
import Image from "next/image";
import ImageDialog from "./imageDialog";

const Infrastructure = (galleryImages: DataFromCollectionSlug<CollectionSlug>[]) => {
  const galleryImageByCategory = objectToArray(galleryImages);
  const [filter, setFilter] = useState('Chhatrapati Sambhaji Nagar');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const FilteredImages = galleryImageByCategory.filter((item: any) => item.location === filter);
  const FilterByLocationImages = galleryImageByCategory.filter((item: any) => item.location);
  const allImages = FilteredImages.flatMap(category => category.images);
  const uniqueLocations = new Set(FilterByLocationImages.map((item: any) => item.location));

  const uniqueLocationArray = Array.from(uniqueLocations)

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

        <div className="max-w-4xl mx-auto">
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
                    <Image
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