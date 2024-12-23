'use client'

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  // CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { CollectionSlug, DataFromCollectionSlug } from "payload";


const examCategories = [
  {
    name: "SSC",
  },
  {
    name: "Railways",
  },
  {
    name: "MPSC",
  },
  {
    name: "IBPS",
  }
];

const examCards = [
  {
    id: 1,
    title: "Bank Maha Pack",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/bank-maha-pack",
  },
  {
    id: 2,
    title: "Bank Batches 2025-26",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/bank-batches",
  },
  {
    id: 3,
    title: "Bankers Adda",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/bankers-adda",
  },
  {
    id: 4,
    title: "SBI SO Assistant Manager",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/sbi-so",
  },
  {
    id: 5,
    title: "SBI Clerk",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/sbi-clerk",
  },
  {
    id: 6,
    title: "IBPS PO",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/ibps-po",
  },
  {
    id: 7,
    title: "UIIC",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/uiic",
  },
  {
    id: 8,
    title: "IBPS RRB GBO SO",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/ibps-rrb-gbo",
  },
  {
    id: 9,
    title: "SBI PO",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/sbi-po",
  },
  {
    id: 10,
    title: "IBPS RRB PO Clerk",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/ibps-rrb-po-clerk",
  },
  {
    id: 11,
    title: "NICL",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/nicl",
  },
  {
    id: 12,
    title: "ECGC PO",
    logo: "/placeholder.svg?height=60&width=60",
    link: "/exams/ecgc-po",
  },
];


export default function ExamExplorer(_: DataFromCollectionSlug<CollectionSlug>[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = examCards.filter((exam) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading>
        Explore by <span className="text-[#F3C623]">Exams</span>
      </SectionHeading>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-[#10375C] mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#F3C623]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                />
              </svg>
              GOVERNMENT JOB EXAMS
            </h2>
            <div className="space-y-2">
              {examCategories.map((category) => (
                <Collapsible key={category.name}>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-md"
                  // onClick={() => toggleCategory(category.name)}
                  >
                    <span className="text-sm font-medium text-[#10375C]">
                      {category.name}
                    </span>
                    {/* <svg
                      className={`w-4 h-4 transition-transform ${expandedCategories.includes(category.name)
                        ? "transform rotate-180"
                        : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg> */}
                  </CollapsibleTrigger>
                  {/* <CollapsibleContent>
                    <div className="pl-4 mt-1 space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item}
                          href={`/exams/${item
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          className="block py-1 px-2 text-sm text-[#10375C] hover:text-[#F3C623] hover:bg-gray-50 rounded"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent> */}
                </Collapsible>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-auto ml-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Find your exam"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[300px] border-[#10375C] focus:ring-[#F3C623] focus:border-[#F3C623]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredExams.map((exam) => (
              <Link key={exam.id} href={exam.link}>
                <Card className="hover:shadow-lg transition-shadow border-[#10375C]">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Image
                      src={exam.logo}
                      alt={exam.title}
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

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              className="text-[#F3C623] hover:text-[#EB8317]"
            >
              View All Banking And Insurance Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
