"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { CarouselProps } from "react-responsive-carousel";
import { Button } from "./ui/button";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { objectToArray } from "@/lib/utils";
import Image from "next/image";

const Carousel = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  { ssr: false }
);

const carouselProps: Partial<CarouselProps> = {
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: false,
  autoPlay: true,
  interval: 5000,
  axis: "horizontal",
  centerMode: false,
  centerSlidePercentage: 100,
  labels: {
    leftArrow: "Previous slide",
    rightArrow: "Next slide",
    item: "slide item",
  },
  onClickItem: () => { },
  onClickThumb: () => { },
  onChange: () => { },
  onSwipeStart: () => { },
  onSwipeEnd: () => true,
  onSwipeMove: () => true,
};


const Infrastructure = (galleryImages: DataFromCollectionSlug<CollectionSlug>[]) => {
  const galleryImageByCategory = objectToArray(galleryImages);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>Gallery</SectionHeading>

        <div className="max-w-4xl mx-auto">

          <Carousel  {...(carouselProps as CarouselProps)}>
            {galleryImageByCategory.flatMap(category =>
              category.images.map((image: any) => (
                <div key={image.id} className="relative h-[400px]">
                  <Image
                    src={image.image.url}
                    alt={image.image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md object-fit mb-4"
                  />
                  <p className="legend bg-[#10375C] text-[#F4F6FF]">
                    {category.category}
                  </p>
                </div>
              ))
            )}
          </Carousel>

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
