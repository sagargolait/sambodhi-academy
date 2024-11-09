'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Button } from './ui/button'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import type { CarouselProps } from 'react-responsive-carousel'
import Link from 'next/link'
import Image from 'next/image'

const Carousel = dynamic(
  () => import('react-responsive-carousel').then((mod) => mod.Carousel),
  { ssr: false }
)

const carouselProps: CarouselProps = {
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: false,
  autoPlay: true,
  interval: 5000,
  axis: 'horizontal',
  centerMode: false,
  centerSlidePercentage: 100,
  labels: {
    leftArrow: 'Previous slide',
    rightArrow: 'Next slide',
    item: 'slide item'
  },
  onClickItem: () => {},
  onClickThumb: () => {},
  onChange: () => {},
  onSwipeStart: () => {},
  onSwipeEnd: () => {},
  onSwipeMove: () => {},
}

const Hero: React.FC = () => {
  return (
    <section className="relative">
      <div className="h-[500px]">
        <Carousel {...carouselProps}>
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-[500px]">
              <Image
                src={`/banner${index}.jpg`}
                priority
                width={500}
                height={500}
                alt={`Hero background ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F4F6FF]">
            Prepare for Government Exams
          </h1>
          <p className="text-xl mb-8 text-[#F4F6FF]">
            Expert-led courses and comprehensive study materials
          </p>
          <Link href='/courses'>
          <Button size="lg" className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
            Explore Courses
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero