"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { CarouselProps } from "react-responsive-carousel";
import Link from "next/link";
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
  onClickItem: () => {},
  onClickThumb: () => {},
  onChange: () => {},
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
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F4F6FF]">
            Prepare for Government Exams
          </h1>
          <p className="text-xl mb-8 text-[#F4F6FF]">
            Expert-led courses and comprehensive study materials
          </p>
          <Link href="/courses">
            <Button
              size="lg"
              className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
            >
              Explore Exams
            </Button>
          </Link>
        </div>
      </div> */}
      <WhatsNewSection />
    </section>
  );
};

export default Hero;
