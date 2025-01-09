"use client";

import React, { useState } from "react";
import { objectToArray } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

const Infrastructure = (galleryImages: DataFromCollectionSlug<CollectionSlug>[]) => {
  const galleryImageByCategory = objectToArray(galleryImages);
  const [filter, setFilter] = useState('aurangabad');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const FilteredImages = galleryImageByCategory.filter((item: any) => item.location === filter);
  const FilterByLocationImages = galleryImageByCategory.filter((item: any) => item.location);

  // Create a flat array of all images for the carousel
  const allImages = FilteredImages.flatMap(category => category.images);

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
            {FilterByLocationImages.map((item: any) => (
              <Button
                key={item.id}
                onClick={() => setFilter(item.location)}
                variant={filter === item.location ? "default" : "outline"}
                className="capitalize"
              >
                {item.location}
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] h-[90vh] p-0" hideCloseButton={true}>
          <DialogTitle className="sr-only">
            Image Gallery View
          </DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center bg-black/50">
            <Image
              src={allImages[selectedImageIndex]?.image.url}
              alt={allImages[selectedImageIndex]?.image.alt}
              fill
              className="max-h-full max-w-full object-contain"
            />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Close dialog"
            >
              <X className="h-8 w-8" color="grey" />
            </button>

            <button
              onClick={previousImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8 rounded-full" color="grey" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8 rounded-full" color="grey" />
            </button>

          </div>
        </DialogContent>
      </Dialog>

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