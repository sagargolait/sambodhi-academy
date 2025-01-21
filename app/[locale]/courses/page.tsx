'use client';

import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomImage from "@/utilities/CustomImage";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { useEffect, useState } from "react";




export default function CoursesPage() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const results = await fetch(`/api/courses`).then((res) => res.json())
        setCourses(results.docs)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCourses()
  }, [])


  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>OurCourses</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course: any) => (
            <Card key={course.id} className="flex flex-col">
              <CustomImage
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-[#10375C] my-2 text-center">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{course.description}</p>
              </CardContent>
              <div className="p-2 pt-0 mt-auto">
                <Link href={`/courses/${course.slug}`}>
                  <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                    Learn More <ChevronRight size={24} className="inline-block ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
