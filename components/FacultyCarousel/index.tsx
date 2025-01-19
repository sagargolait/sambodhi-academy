'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import SectionHeading from '../SectionHeading'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import CustomImage from '@/utilities/CustomImage'

interface FacultyProps {
    faculties: DataFromCollectionSlug<CollectionSlug>[]
}

const FacultyCarousel: React.FC<FacultyProps> = ({ faculties }) => {
    return (

        <div className="relative container mx-auto">
            <SectionHeading>OurFaculty</SectionHeading>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-5xl mx-auto"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {faculties.map((faculty: any) => (
                        <CarouselItem key={faculty.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                            <Card className="bg-white border-none shadow-lg overflow-hidden">
                                <CardContent className="flex flex-col items-center p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-32 bg-[#10375C] rounded-b-full transform translate-y-[-50%]"></div>
                                    <div className="relative w-48 h-48 mb-4 z-10">
                                        <div className="absolute inset-0 bg-[#F3C623] rounded-full transform -skew-y-6"></div>
                                        <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-white">
                                            <CustomImage
                                                src={faculty.profileImage.url}
                                                alt={faculty.profileImage.alt || `alt${faculty.id}`}
                                                fill
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-xl text-center font-bold text-[#10375C] mb-2 z-10">{faculty.name}</h3>
                                    <p className="text-[#1E4E6F] font-semibold mb-1 z-10 capitalize">{faculty.department}</p>
                                    <p className="text-gray-600 z-10">{faculty['Years of Experience']} Years of Experience</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2">
                    <CarouselPrevious className="bg-[#10375C] text-white hover:bg-[#1E4E6F]" />
                </div>
                <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2">
                    <CarouselNext className="bg-[#10375C] text-white hover:bg-[#1E4E6F]" />
                </div>
            </Carousel>
        </div>
    )
}

export default FacultyCarousel;