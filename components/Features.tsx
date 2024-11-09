import React from 'react'
import { BookOpen, GraduationCap, Users, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card'
import SectionHeading from './SectionHeading'

const Features: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>Our Features</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: BookOpen, title: "Comprehensive Study Material" },
            { icon: GraduationCap, title: "Expert Faculty" },
            { icon: Users, title: "Interactive Learning" },
            { icon: CheckCircle, title: "Regular Mock Tests" },
          ].map((feature, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-2 text-[#F3C623]" />
                <CardTitle className="text-[#10375C]">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#10375C]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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