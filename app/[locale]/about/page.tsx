'use client'

import { Features } from "@/components";
import FacultyCarousel from "@/components/FacultyCarousel";
import SectionHeading from "@/components/SectionHeading";
import CustomImage from "@/utilities/CustomImage";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const [facultyMembers, setFacultyMembers] = useState([])
  const [featureData, setFeatureData] = useState([])
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const t = useTranslations();
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const [facultyMembersData, featuresData] = await Promise.all([
          fetch('/api/faculty?locale=' + locale),
          fetch('/api/feature-descriptions?locale=' + locale)
        ]);

        const facultyResp = await facultyMembersData.json();
        const featureResp = await featuresData.json();

        setFacultyMembers(facultyResp.docs);
        setFeatureData(featureResp.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchFacultyData();
  }, [])
  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>AboutSambodhiAcademy</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              {t('OurMission')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("MissionDescription")}
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              {t('OurVision')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("VisionDescription")}
            </p>
            {/* <h3 className="text-2xl font-semibold mb-4 text-[#10375C]">
              About our Founder and President
            </h3>
            <p className="text-gray-600">
              The Sambodhi Academy was founded by Mr. Bhimrao Hattiambire, on 14th October 1997. It was a turning point in his life and also in the lives of thousands of beneficiaries of his activities in the years that followed. Despite all ups and downs in his personal life, he has been relentlessly working in the social field, solving problems of people, effecting social reforms of various kinds.
            </p> */}
          </div>
          <div>
            <CustomImage
              src="/api/media/file/director-about.jpg"
              alt="Sambodhi Director"
              className="rounded-lg shadow-lg"
              width={600}
              height={400}
            />
          </div>
        </div>
        <Features features={featureData} />
        <FacultyCarousel faculties={facultyMembers} />
      </main>
    </div>
  );
}
