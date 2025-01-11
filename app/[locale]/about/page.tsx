'use client'

import FacultyCarousel from "@/components/FacultyCarousel";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [facultyMembers, setFacultyMembers] = useState([])
  useEffect(() => {
    const fetchFacultyData = async () => {
      const facultyMembersData = await fetch('/api/faculty')
      const data = await facultyMembersData.json()
      setFacultyMembers(data.docs)
    }

    fetchFacultyData()
  }, [])
  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>About Sambodhi Academy</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-4">
              At Sambodhi Academy, our mission is to empower aspiring individuals
              with the knowledge, skills, and confidence needed to excel in
              government service examinations. We are committed to providing
              high-quality education, personalized guidance, and comprehensive
              support to help our students achieve their career goals in public
              service.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              Our Vision
            </h3>
            <p className="text-gray-600 mb-4">
              We envision a future where every ambitious individual has access
              to top-notch educational resources and mentorship to pursue a
              successful career in government services. Our goal is to be the
              leading institute in preparing competent and ethical civil
              servants who will contribute to the nation&apos;s progress and
              development.
            </p>
            {/* <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              About our Founder and President
            </h3>
            <p className="text-gray-600">
              The Sambodhi Academy was founded by Mr. Bhimrao Hattiambire, on 14th October 1997. It was a turning point in his life and also in the lives of thousands of beneficiaries of his activities in the years that followed. Despite all ups and downs in his personal life, he has been relentlessly working in the social field, solving problems of people, effecting social reforms of various kinds.
            </p> */}
          </div>
          <div>
            <Image
              src="/api/media/file/director-about.jpg"
              alt="Sambodhi Director"
              className="rounded-lg shadow-lg"
              width={600}
              height={400}
            />
          </div>
        </div>

        <FacultyCarousel faculties={facultyMembers} />
      </main>
    </div>
  );
}
