import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from '../SectionHeading'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Star } from "lucide-react"
import { truncateText } from "@/lib/utils"

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
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {testimonials.map((testimonial: any) => (
                        <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                <CardContent className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <Avatar className="h-14 w-14 mr-4">
                                                <AvatarImage src={testimonial.Image?.url} alt={testimonial.Image?.alt} />
                                                <AvatarFallback>{testimonial.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold text-[#10375C]">{testimonial.name}</h3>
                                                <p className="text-sm text-[#1E4E6F]">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{truncateText(testimonial.quote, 200)}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 text-[#F3C623] fill-current" />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-[#10375C]">{testimonial.achievement}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#10375C] text-white hover:bg-[#1E4E6F]" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#10375C] text-white hover:bg-[#1E4E6F]" />
            </Carousel>

        </div>
    )
}

export default Testimonials;