'use client';

import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomImage from "@/utilities/CustomImage";
import Link from "next/link";
import { use } from "react";
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




export default function CoursesPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params);
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const results = await fetch(`/api/courses?locale=${locale}`).then((res) => res.json())
        setCourses(results.docs)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCourses()
  }, [locale])

  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>OurCourses</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <Card key={course.id} className="flex flex-col">
              <CustomImage
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-[#10375C]">{course['Course Title']}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{course.description}</p>
              </CardContent>
              <div className="p-4 pt-0 mt-auto">
                <Link href='/courses'>
                  <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                    Enroll Now
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
