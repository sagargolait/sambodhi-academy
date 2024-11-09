import React from 'react'
import SectionHeading from './SectionHeading'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

type Props = {}

const Associates = (props: Props) => {
  const associates = [
    { name: 'Dr. Babasaheb Ambedkar Research and Training Institute (Barti), Pune', image: '/barti.jpg' },
    { name: 'Mahatma Jyoti Phule Research and Training Institute (Mahajyoti) ', image: '/mahajyoti.png' },
  ]
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <SectionHeading>Our Associates and Facilitators from The Government</SectionHeading>
        <div className="flex justify-center gap-8">
          {associates.map((associate, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Image src={associate.image} alt={associate.name} width={150} height={150} className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#10375C]">{associate.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Associates