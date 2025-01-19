'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SectionHeading from '@/components/SectionHeading'
import Link from 'next/link'

interface Products {
    id: string;
    productType: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Products[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const results = await fetch(`/api/products`).then((res) => res.json())
                setProducts(results.docs)
            } catch (err) {
                console.log(err)
            }
        }

        fetchProducts()
    }, [])

    const mockTests = products.filter((product) => product?.productType === 'mock-test')
    const books = products.filter((product) => product?.productType === 'book')

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <main className="flex-grow">
                <section className="py-20 text-[#10375C]">
                    <div className="container mx-auto px-4">
                        <SectionHeading>OurProducts</SectionHeading>
                        <p className="text-xl text-center">Enhance your preparation with our curated mock tests and books</p>
                    </div>
                </section>

                <section>
                    <div className="container mx-auto px-4">
                        <Tabs defaultValue="mock-tests" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="mock-tests" className="text-lg">Mock Tests</TabsTrigger>
                                <TabsTrigger value="books" className="text-lg">Books</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mock-tests">
                                <SectionHeading>MockTests</SectionHeading>
                                {mockTests.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {mockTests.map((test: any) => (
                                            <Card key={test.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                                                <CardHeader className='flex items-center justify-center'>
                                                    <Image src={test.thumbnailImage.url || "/api/media/file/placeholder.webp"} alt={test.thumbnailImage.alt} width={200} height={200} className="rounded-t-lg" />
                                                </CardHeader>
                                                <CardContent className="flex-grow">
                                                    <CardTitle className="text-lg font-bold text-[#10375C] mb-2">{test.title}</CardTitle>
                                                    <CardDescription className="text-[#1E4E6F]">
                                                        {test.description}
                                                    </CardDescription>
                                                </CardContent>
                                                <CardContent className="flex justify-center items-center">
                                                    <Link href={test.metadata.link} target='_blank'>
                                                        <Button className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">Link</Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-[#1E4E6F]">
                                        No mock tests available at the moment.
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="books">
                                <SectionHeading>Books</SectionHeading>
                                {books.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {books.map((book: any) => (
                                            <Card key={book.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                                                <CardHeader className='flex items-center justify-center'>
                                                    <Image src={book.thumbnailImage.url || "/api/media/file/placeholder.webp"} alt={book.thumbnailImage.alt} width={200} height={200} className="rounded-t-lg" />
                                                </CardHeader>
                                                <CardContent className="flex-grow">
                                                    <CardTitle className="text-lg text-center font-bold text-[#10375C] mb-2">{book.title}</CardTitle>
                                                    {book.author && <CardDescription className="text-[#1E4E6F]">
                                                        By {book.author}
                                                    </CardDescription>}
                                                </CardContent>
                                                <CardContent className="flex justify-center items-center">
                                                    <Button className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">Link</Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-[#1E4E6F]">
                                        No books available at the moment.
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
        </div>
    )
}