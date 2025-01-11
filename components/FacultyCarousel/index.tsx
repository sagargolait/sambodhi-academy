'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import SectionHeading from '../SectionHeading'



export function FacultyCarousel({ faculties }: any) {
    return (
        <div className="relative container mx-auto">
            <SectionHeading>Our Faculty</SectionHeading>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    containScroll: "trimSnaps",
                }}
                className="w-full mx-auto relative"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {faculties.map((faculty: any) => (
                        <CarouselItem key={faculty.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/5">
                            <div className="p-1">
                                <Card className="h-[250px] flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
                                    <CardHeader>
                                        <div className="relative">
                                            <Image
                                                src={faculty.profileImage.url}
                                                alt={faculty.profileImage.alt}
                                                objectFit="cover"
                                                width={100} height={100}
                                                className="w-24 h-24 rounded-full mx-auto"
                                            />
                                        </div>
                                        <CardTitle className="text-xl text-center font-bold text-[#10375C]">{faculty.name}</CardTitle>
                                        <CardDescription className="text-[#F3C623] text-center font-semibold capitalize">{faculty.designation}, {faculty.department}</CardDescription>
                                    </CardHeader>
                                    {/* <CardContent className="flex-grow">
                                        <p className="text-sm text-gray-600">{faculty.description}</p>
                                    </CardContent> */}
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute md:left-0 left-[35px] top-1/2 -translate-y-1/2">
                    <CarouselPrevious className='!rounded-full' />
                </div>
                <div className="absolute md:right-0 right-[35px] top-1/2 -translate-y-1/2">
                    <CarouselNext className='!rounded-full' />
                </div>
            </Carousel>
        </div>
    )
}