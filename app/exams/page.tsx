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

const exams = [
  {
    id: 1,
    title: "UPSC Civil Services Examination",
    description:
      "The most prestigious exam for Indian Administrative Service (IAS), Indian Police Service (IPS), and other central services.",
    date: "Preliminary: June 2024, Mains: September 2024",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "SSC Combined Graduate Level (CGL)",
    description:
      "For various Group B and C posts in different ministries and departments of the Government of India.",
    date: "Tier I: August 2024, Tier II: November 2024",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "IBPS PO/MT",
    description:
      "For Probationary Officer/Management Trainee positions in various public sector banks.",
    date: "Preliminary: October 2024, Mains: November 2024",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "RRB NTPC",
    description:
      "For various Non-Technical Popular Categories of posts in Indian Railways.",
    date: "CBT 1: July 2024, CBT 2: September 2024",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>Upcoming Government Exams</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exams.map((exam) => (
            <Card key={exam.id} className="flex flex-col">
              <Image
                src={exam.image}
                alt={exam.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-[#10375C]">{exam.title}</CardTitle>
                <CardDescription>{exam.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{exam.description}</p>
              </CardContent>
              <div className="p-4 pt-0 mt-auto">
                <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                  Prepare for this Exam
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading>Exam Resources</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#10375C]">
                  Study Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access our comprehensive study materials, including textbooks,
                  notes, and practice questions.
                </p>
                <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                  Browse Materials
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#10375C]">Mock Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Take our series of mock tests to assess your preparation and
                  improve your performance.
                </p>
                <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                  Start a Mock Test
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#10375C]">
                  Expert Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get personalized advice and strategies from our experienced
                  faculty members.
                </p>
                <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                  Book a Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
