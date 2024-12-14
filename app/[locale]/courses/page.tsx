import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-12 text-[#10375C] relative pb-4">
    {children}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F3C623]"></span>
  </h2>
);

const courses = [
  {
    id: 1,
    title: "UPSC Civil Services",
    description:
      "Comprehensive preparation for IAS, IPS, and other civil services exams.",
    duration: "12 months",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "SSC Exams",
    description:
      "Prepare for various Staff Selection Commission exams with our expert guidance.",
    duration: "6 months",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Banking Exams",
    description:
      "Get ready for IBPS, SBI, and other banking sector exams with our specialized courses.",
    duration: "4 months",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Railway Recruitment",
    description:
      "Comprehensive coaching for various railway recruitment exams and positions.",
    duration: "3 months",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "State Public Service Commission",
    description:
      "Tailored preparation for state-level administrative and allied services exams.",
    duration: "9 months",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Defense Services Exams",
    description:
      "Specialized coaching for NDA, CDS, and other defense services entrance exams.",
    duration: "6 months",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>Our Courses</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-[#10375C]">{course.title}</CardTitle>
                <CardDescription>Duration: {course.duration}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{course.description}</p>
              </CardContent>
              <div className="p-4 pt-0 mt-auto">
                <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
