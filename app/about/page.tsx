import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-12 text-[#10375C] relative pb-4">
    {children}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F3C623]"></span>
  </h2>
);

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    position: "Founder & Director",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Prof. Anita Sharma",
    position: "Academic Head",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Mr. Vikram Singh",
    position: "Chief Strategy Officer",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Ms. Priya Patel",
    position: "Student Success Manager",
    image: "/placeholder.svg?height=150&width=150",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>About GovEduInstitute</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-4">
              At GovEduInstitute, our mission is to empower aspiring individuals
              with the knowledge, skills, and confidence needed to excel in
              government service examinations. We are committed to providing
              high-quality education, personalized guidance, and comprehensive
              support to help our students achieve their career goals in public
              service.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              Our Vision
            </h3>
            <p className="text-gray-600">
              We envision a future where every ambitious individual has access
              to top-notch educational resources and mentorship to pursue a
              successful career in government services. Our goal is to be the
              leading institute in preparing competent and ethical civil
              servants who will contribute to the nation&apos;s progress and
              development.
            </p>
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="GovEduInstitute Campus"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <SectionHeading>Our Team</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <CardHeader>
                  <CardTitle className="text-[#10375C]">
                    {member.name}
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600">{member.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
