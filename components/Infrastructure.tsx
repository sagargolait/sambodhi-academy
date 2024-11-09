'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import type { CarouselProps } from 'react-responsive-carousel'
import { Button } from './ui/button'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

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
  onClickItem: () => { },
  onClickThumb: () => { },
  onChange: () => { },
  onSwipeStart: () => { },
  onSwipeEnd: (event) => {
    return true; // Return a boolean value
  },
  onSwipeMove: (event) => {
    return true; // Return a boolean value
  },
}

const Infrastructure: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>Our Infrastructure</SectionHeading>

        <div className="max-w-4xl mx-auto">
          <Carousel {...carouselProps}>
            {['Library', 'Computer Lab', 'Classroom', 'Auditorium', 'Sports Complex'].map((facility, index) => (
              <div key={facility}>
                <img
                  src={`/gallery/jpg${index + 1}.jpeg`}
                  alt={facility}
                  className="w-full h-[400px] object-cover"
                />
                <p className="legend bg-[#10375C] text-[#F4F6FF]">{facility}</p>
              </div>
            ))}
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
  )
}

export default Infrastructure