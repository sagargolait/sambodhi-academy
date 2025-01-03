'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card'
import SectionHeading from './SectionHeading'
import Image from 'next/image'

const Features: React.FC = () => {
  const [features, setFeatures] = useState<{ id: string; title: string; description: string, Icon: any }[]>([])

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const response = await fetch('/api/feature-descriptions')
        const data = await response.json()
        setFeatures(data.docs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchFeatures()
  }, [])
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>Our Features</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <Image src={feature.Icon.url} alt={feature.Icon.alt} width={25} height={25} className='text-[#F3C623] mb-2' />
                <CardTitle className="text-[#10375C]">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#10375C]">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features