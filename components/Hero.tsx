"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { CarouselProps } from "react-responsive-carousel";
import Image from "next/image";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { objectToArray } from "@/lib/utils";
import { WhatsNewSection } from "./whatsNewSection";

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
  onSwipeStart: () => false,
  onSwipeEnd: () => false,
  onSwipeMove: () => false,
};

const Hero = (heroImages: DataFromCollectionSlug<CollectionSlug>[]) => {
  const Imgs = objectToArray(heroImages);
  const heroCategoryData = Imgs.filter(item => item.category === 'Hero');

  return (
    <section className="flex flex-wrap justify-between gap-4 relative bg-[url('/api/media/file/blur-coffee-shop.jpg')]">
      <div className="h-[550px] w-full lg:w-2/3">
        {heroCategoryData.map((item) => (
          <div key={item.id} className="image-category w-full">
            <div className="image-list w-full p-4">
              <Carousel {...(carouselProps as CarouselProps)}>
                {item.images.map((imageItem: any) => (
                  <div key={imageItem.id} className="h-[550px]">
                    <Image
                      src={imageItem.image.url}
                      alt={imageItem.image.alt}
                      layout="fill"
                      objectFit="center"
                      className="rounded-xl"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        ))}
      </div>
      <WhatsNewSection />
    </section>
  );
};

export default Hero;
