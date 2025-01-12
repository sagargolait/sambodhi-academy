'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'
import SectionHeading from './SectionHeading'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'

interface FAQProps {
  faqs: DataFromCollectionSlug<CollectionSlug>[]
}

const FAQs: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>FrequentlyAskedQuestions</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((item: any, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-[#10375C] hover:text-[#F3C623]">{item.question}</AccordionTrigger>
                <AccordionContent className="text-[#10375C]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((item: any, index) => (
              <AccordionItem value={`item-${index + Math.ceil(faqs.length / 2)}`} key={index + Math.ceil(faqs.length / 2)}>
                <AccordionTrigger className="text-[#10375C] hover:text-[#F3C623]">{item.question}</AccordionTrigger>
                <AccordionContent className="text-[#10375C]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQs