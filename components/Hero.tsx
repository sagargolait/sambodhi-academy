"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { CarouselProps } from "react-responsive-carousel";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { objectToArray } from "@/lib/utils";
import { WhatsNewSection } from "./whatsNewSection";
import Image from "next/image";

const Carousel = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-[550px] rounded-xl" />
  }
);

const carouselProps: Partial<CarouselProps> = {
  showArrows: true,
  showStatus: false,
  showIndicators: false,
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
};

interface HeroProps {
  heroImages: DataFromCollectionSlug<CollectionSlug>[];
  announcements: DataFromCollectionSlug<CollectionSlug>[];
}

const Hero: React.FC<HeroProps> = ({ heroImages, announcements }) => {
  const Imgs = objectToArray(heroImages);
  const heroCategoryData = Imgs.filter(item => item.category === 'Hero');

  React.useEffect(() => {
    const firstImage = heroCategoryData[0]?.images[0]?.image;
    if (firstImage) {
      const preloadImage = new window.Image();
      preloadImage.src = firstImage.url;
    }
  }, [heroCategoryData]);

  return (
    <section className="flex flex-wrap justify-between gap-4 relative bg-[url('/blur-bg.jpg')]">
      <div className="h-[550px] w-full lg:w-2/3">
        {heroCategoryData.map((item) => (
          <div key={item.id} className="image-category w-full">
            <div className="image-list w-full p-4">
              <Carousel {...(carouselProps as CarouselProps)}>
                {item.images.map((imageItem: any, index: number) => (
                  <div key={imageItem.id} className="h-[500px] relative">
                    <Image
                      src={imageItem.image.url}
                      alt={imageItem.image.alt}
                      fill
                      className="rounded-xl object-fit w-full h-full"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        ))}
      </div>
      <WhatsNewSection announcements={announcements} />
    </section>
  );
};

export default Hero;