import React from "react";
import SectionHeading from "./SectionHeading";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import CustomImage from "@/utilities/CustomImage";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "MPSC State Services",
      image: "/mpsc.jpeg",
      description:
        "Comprehensive preparation for IAS, IPS, and other civil services.",
    },
    {
      id: 2,
      title: "SSC Exam",
      image: "/placeholder.svg?height=200&width=300",
      description: "Prepare for various Staff Selection Commission exams.",
    },
    {
      id: 3,
      title: "Banking and Clerical Exam",
      image: "/placeholder.svg?height=200&width=300",
      description: "Get ready for IBPS, SBI, and other banking sector exams.",
    },
    {
      id: 4,
      title: "Police Pre-Recruitment",
      image: "/police.jpg",
      description:
        "Specialized coaching for various railway recruitment exams.",
    },
    {
      id: 5,
      title: "PSI,STI,ASO",
      image: "/psi.jpeg",
      description:
        "Comprehensive preparation for IAS, IPS, and other civil services.",
    },
    {
      id: 6,
      title: "Carrer Guidance",
      image: "/placeholder.svg?height=200&width=300",
      description: "Prepare for various Staff Selection Commission exams.",
    },
  ];
  return (
    <section className="py-16 bg-[#F4F6FF]">
      <div className="container mx-auto px-4">
        <SectionHeading>Competative Exams</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CustomImage
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-56 object-fill"
              />
              <CardHeader>
                <CardTitle className="text-[#10375C]">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {course.description}
                </p>
                <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
