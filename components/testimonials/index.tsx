'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { objectToArray } from '@/lib/utils'



export default function Testimonials(testimonials: DataFromCollectionSlug<CollectionSlug>[]) {
    const [currentIndex, setCurrentIndex] = useState(0)


    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % objectToArray(testimonials).length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + objectToArray(testimonials).length) % objectToArray(testimonials).length)
    }

    return (
        <div className="relative max-w-4xl mx-auto">
            <SectionHeading>Testimonials</SectionHeading>
            <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                        {objectToArray(testimonials)[currentIndex]?.image && <Image
                            src={objectToArray(testimonials)[currentIndex]?.image}
                            alt={objectToArray(testimonials)[currentIndex]?.name}
                            width={100}
                            height={100}
                            className="rounded-full mb-4"
                        />}
                        <p className="text-lg mb-4 text-[#10375C]">&quot;{objectToArray(testimonials)[currentIndex].quote}&quot;</p>
                        <h3 className="font-semibold text-[#10375C]">{objectToArray(testimonials)[currentIndex].name}</h3>
                        <p className="text-sm text-[#F3C623]">{objectToArray(testimonials)[currentIndex].role}</p>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4">
                <Button
                    variant="outline"
                    size="default"
                    className="rounded-full bg-white text-[#10375C] hover:bg-[#F3C623] hover:text-white"
                    onClick={prevTestimonial}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4">
                <Button
                    variant="outline"
                    size="default"
                    className="rounded-full bg-white text-[#10375C] hover:bg-[#F3C623] hover:text-white"
                    onClick={nextTestimonial}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}