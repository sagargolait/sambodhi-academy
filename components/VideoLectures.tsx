"use client";

import React from "react";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "./ui/button";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { CarouselProps } from "react-responsive-carousel";

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

const videoLectures = [
  {
    url: "https://www.youtube.com/watch?v=1WthGgG7RyU",
    title: "Introduction to Government Exams",
  },
  {
    url: "https://www.youtube.com/watch?v=lalVSi80D7A",
    title: "Mastering Current Affairs",
  },
  {
    url: "https://www.youtube.com/watch?v=wkpUW4pKUmQ",
    title: "Quantitative Aptitude Tips",
  },
  {
    url: "https://www.youtube.com/watch?v=uLgLVmD3jkw",
    title: "Indian History Overview",
  },
  {
    url: "https://www.youtube.com/watch?v=XgtdCxdLneE",
    title: "Economics for UPSC",
  },
  {
    url: "https://www.youtube.com/watch?v=IJNgknRe_Nc",
    title: "Geography Masterclass",
  },
  {
    url: "https://www.youtube.com/watch?v=UHQBqE25ANE",
    title: "Indian Polity Explained",
  },
  {
    url: "https://www.youtube.com/watch?v=MWM3wv0vkKY",
    title: "Science and Technology for Competitive Exams",
  },
];

const VideoLectures: React.FC = () => {
  return (
    <section className="py-10 bg-[#F4F6FF]">
      <div className="container mx-auto px-4">
        <SectionHeading>VideoLectures</SectionHeading>

        <div className="max-w-6xl mx-auto">
          <Carousel {...(carouselProps as CarouselProps)}>
            {[0, 4].map((startIndex) => (
              <div
                key={startIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {videoLectures
                  .slice(startIndex, startIndex + 4)
                  .map((lecture, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="aspect-w-4 aspect-h-3 h-[200px] mb-2">
                        <ReactPlayer
                          url={lecture.url}
                          width="100%"
                          height="100%"
                          controls={true}
                          light={true}
                        />
                      </div>
                      <p className="text-sm font-medium text-[#10375C] line-clamp-2">
                        {lecture.title}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </Carousel>
        </div>
        <div className="mt-8 text-center">
          <Link href="https://www.youtube.com/@sambodhicompetitiveexamtra414/videos">
            <Button className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
              Watch All Videos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoLectures;
