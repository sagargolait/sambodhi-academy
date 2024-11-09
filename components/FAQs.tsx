'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'
import SectionHeading from './SectionHeading'

const faqItems = [
  {
    question: "What exams do you prepare students for?",
    answer: "We prepare students for a wide range of government exams including UPSC, SSC, Banking, Railways, and more. Our comprehensive courses cover all major competitive exams in India."
  },
  {
    question: "How long are your courses?",
    answer: "The duration of our courses varies depending on the exam and the level of preparation required. Typically, our courses range from 3 months to 1 year. We also offer crash courses and long-term mentorship programs."
  },
  {
    question: "Do you offer online classes?",
    answer: "Yes, we offer both online and offline classes. Our online platform provides live classes, recorded lectures, study materials, and mock tests, allowing students to prepare from anywhere in India."
  },
  {
    question: "What is your success rate?",
    answer: "We're proud of our high success rate. Over the past 5 years, 75% of our students have cleared their chosen exams, with many securing top ranks. However, individual results may vary based on personal effort and dedication."
  },
  {
    question: "Do you provide study materials?",
    answer: "We provide comprehensive study materials including textbooks, notes, practice questions, and online resources. These materials are regularly updated to reflect the latest exam patterns and syllabus changes."
  }
]

const FAQs: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-[#10375C] hover:text-[#F3C623]">{item.question}</AccordionTrigger>
                <AccordionContent className="text-[#10375C]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item, index) => (
              <AccordionItem value={`item-${index + Math.ceil(faqItems.length / 2)}`} key={index + Math.ceil(faqItems.length / 2)}>
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