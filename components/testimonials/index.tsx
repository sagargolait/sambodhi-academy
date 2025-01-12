import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from '../SectionHeading'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

interface TestimonialProps {
    testimonials: DataFromCollectionSlug<CollectionSlug>[]
}

const Testimonials: React.FC<TestimonialProps> = ({ testimonials }) => {
    return (
        <div className="relative container mx-auto">
            <SectionHeading>Testimonials</SectionHeading>
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
                    {testimonials.map((testimonial: any) => (
                        <CarouselItem key={testimonial.id} className="pl-2 md:pl-4">
                            <div className="p-1">
                                <Card className="bg-white shadow-lg m-4">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            {<Image
                                                src={testimonial.Image?.url}
                                                alt={testimonial.Image?.alt}
                                                width={140}
                                                height={140}
                                                className="rounded-full mb-4"
                                            />}
                                            <p className="text-lg mb-4 text-[#10375C]">&quot;{testimonial.quote} &quot;</p>
                                            <h3 className="font-semibold text-[#10375C]">{testimonial.name}</h3>
                                            <p className="text-md text-[#F3C623]">{testimonial.role}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))
                    }

                </CarouselContent>
                <div className="absolute md:left-0 left-0 top-1/2 -translate-y-1/2">
                    <CarouselPrevious className='!rounded-full' />
                </div>
                <div className="absolute md:right-0 right-0 top-1/2 -translate-y-1/2">
                    <CarouselNext className='!rounded-full' />
                </div>
            </Carousel>

        </div>
    )
}

export default Testimonials;