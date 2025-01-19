import React from "react";
import SectionHeading from "./SectionHeading";
import CustomImage from "@/utilities/CustomImage";

const OurStory: React.FC = () => {
  return (
    <section className="py-10 bg-[#F4F6FF]">
      <div className="container mx-auto px-4">
        <SectionHeading>OurStory</SectionHeading>
        <div className="md:flex gap-8 items-center">
          <CustomImage
            src="/director.jpg"
            alt="CEO of Sambodhi Academy"
            width={800}
            height={600}
            className="object-cover mb-4 md:mb-0"
          />
          <div>
            <p className="text-lg mb-4 text-[#10375C]">
              Founded in 2005, Sambodhi Academy began with a vision to empower
              India&apos;s youth with the knowledge and skills needed to excel
              in government service examinations. Our journey started with a
              small batch of 50 students and has now grown to become one of the
              leading institutes in the country.
            </p>
            <p className="text-lg mb-4 text-[#10375C]">
              Over the years, we have helped thousands of students achieve their
              dreams of joining prestigious government services. Our success is
              built on our commitment to excellence, innovative teaching
              methods, and a deep understanding of the ever-evolving examination
              patterns.
            </p>
            <p className="text-lg text-[#10375C]">
              Today, with multiple centers across India and a robust online
              presence, we continue to strive for excellence in education. Our
              team of experienced faculty, many of whom are former civil
              servants, work tirelessly to guide and mentor the next generation
              of India&apos;s administrators and leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
