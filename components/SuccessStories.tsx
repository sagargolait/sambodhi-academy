'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import type { CarouselProps } from 'react-responsive-carousel'

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

const SuccessStories: React.FC = () => {
  return (
    <section className="py-10 bg-[#F4F6FF]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#10375C]">
          Our Successful Students
        </h2>
        <div className="max-w-4xl mx-auto">
          <Carousel {...carouselProps}>
            {[1, 2, 3, 4, 5].map((student, index) => (
              <div key={student} className="bg-white p-6 h-[200px] rounded-lg shadow-md">
                <img
                  src={`/gallery/jpg${index + 1}.jpeg`}
                  alt={`Student ${student}`}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-[#10375C]">
                  Student Name {student}
                </h3>
                <p className="text-[#EB8317]">Cleared Exam XYZ with 95% marks</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default SuccessStories