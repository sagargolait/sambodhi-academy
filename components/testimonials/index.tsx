'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        role: "UPSC CSE 2023 AIR 5",
        image: "/placeholder.svg?height=100&width=100",
        quote: "GovEduInstitute's comprehensive approach and expert faculty were instrumental in my UPSC success. Their personalized guidance made all the difference."
    },
    {
        id: 2,
        name: "Rahul Verma",
        role: "SSC CGL 2023 Topper",
        image: "/placeholder.svg?height=100&width=100",
        quote: "The quality of study material and regular mock tests at GovEduInstitute gave me an edge in my SSC CGL preparation. Highly recommended!"
    },
    {
        id: 3,
        name: "Ananya Patel",
        role: "Bank PO 2023",
        image: "/placeholder.svg?height=100&width=100",
        quote: "GovEduInstitute's specialized banking course and current affairs sessions were crucial for my Bank PO exam. Their faculty's support was unwavering."
    }
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className="relative max-w-4xl mx-auto">
            <SectionHeading>Testimonials</SectionHeading>
            <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            width={100}
                            height={100}
                            className="rounded-full mb-4"
                        />
                        <p className="text-lg mb-4 text-[#10375C]">&quot;{testimonials[currentIndex].quote}&quot;</p>
                        <h3 className="font-semibold text-[#10375C]">{testimonials[currentIndex].name}</h3>
                        <p className="text-sm text-[#F3C623]">{testimonials[currentIndex].role}</p>
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