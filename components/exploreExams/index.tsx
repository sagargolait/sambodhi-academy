'use client'

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { objectToArray } from "@/lib/utils";

export default function ExamExplorer(exams: DataFromCollectionSlug<CollectionSlug>[]) {

  const examCards = objectToArray(exams)
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeading>
        Explore by Exams
      </SectionHeading>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto ">
            {examCards.map((exam) => (
              <Link key={exam.id} href={`/exams/${exam.slug}`} className="text-center">
                <Card className="hover:shadow-lg h-[180px] flex justify-center items-center transition-shadow border-[#10375C]">
                  <CardContent className="p-4 md:flex flex-col flex justify-center items-center gap-3">
                    <Image
                      src={exam.logo.url}
                      alt={exam.logo.alt}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <h3 className="text-sm lg:text-md mt-2 font-medium text-[#10375C]">
                      {exam.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
