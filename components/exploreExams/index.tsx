import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import SectionHeading from "../SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import CustomImage from "@/utilities/CustomImage";

interface ExamProps {
  exams: DataFromCollectionSlug<CollectionSlug>[]
}

const ExamExplorer: React.FC<ExamProps> = ({ exams }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <SectionHeading>ExplorebyExams</SectionHeading>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="container p-0">
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4  ">
            {exams.map((exam: any) => (
              <Link key={exam.id} href={`/exams/${exam.slug}`} className="text-center">
                <Card className="hover:shadow-lg h-[180px] !p-0 flex justify-center items-center transition-shadow border-[#10375C]">
                  <CardContent className="p-4 md:flex flex-col flex justify-center items-center gap-3">
                    {exam?.logo && <CustomImage
                      src={exam.logo.url}
                      alt={exam.logo.alt || exam.title}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />}
                    <h3 className="text-sm lg:text-md mt-2 font-semibold text-[#10375C]">
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

export default ExamExplorer;