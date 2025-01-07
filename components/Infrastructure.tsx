"use client";

import React, { useState } from "react";
import { objectToArray } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { Navigation, Pagination } from "swiper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { Navigation, Pagination } from 'swiper/modules';

const Infrastructure = (galleryImages: DataFromCollectionSlug<CollectionSlug>[]) => {
  const galleryImageByCategory = objectToArray(galleryImages);
  const [filter, setFilter] = useState('aurangabad');
  const FilteredImages = galleryImageByCategory.filter((item: any) => item.location === filter);
  const FilterByLocationImages = galleryImageByCategory.filter((item: any) => item.location);

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
                variant={filter === item.category ? "default" : "outline"}
                className="capitalize"
              >
                {item.location}
              </Button>
            ))}
          </div>

          <div className="swiper-container relative px-10">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={3}
              navigation={{
                enabled: true,
                nextEl: '.custom-next',
                prevEl: '.custom-prev'
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              className="relative"
            >
              {FilteredImages.flatMap(category =>
                category.images.map((image: any) => (
                  <SwiperSlide key={image.id}>
                    <img
                      src={image.image.url}
                      alt={image.image.alt}
                      className="rounded-md object-fit mb-4"
                    />
                  </SwiperSlide>
                ))
              )}
            </Swiper>

            <button className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="https://www.youtube.com/@sambodhicompetitiveexamtra414/videos">
          <Button className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Infrastructure;
