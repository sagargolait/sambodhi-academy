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
    <div className="container mx-auto px-4 py-8">
      <SectionHeading>
        Explore by <span className="text-[#F3C623]">Exams</span>
      </SectionHeading>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
            {examCards.map((exam) => (
              <Link key={exam.id} href={`/exams/${exam.slug}`}>
                <Card className="hover:shadow-lg h-[100px] flex justify-center transition-shadow border-[#10375C]">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Image
                      src={exam.logo.url}
                      alt={exam.logo.alt}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <h3 className="text-sm font-medium text-[#10375C]">
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
