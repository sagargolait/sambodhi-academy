'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'

interface Paper {
    id: string;
    title: string;
    year: number;
    PaperPdf: {
        url: string;
    };
    exam: {
        title: string;
    };
}

interface GroupedData {
    title: string;
    papers: Paper[];
}

function groupByExamTitle(data: Paper[]) {
    return data.reduce((acc: { [key: string]: Paper[] }, item: Paper) => {
        const examTitle = item.exam.title;
        if (!acc[examTitle]) {
            acc[examTitle] = [];
        }
        acc[examTitle].push(item);
        return acc;
    }, {});
}

function groupAndConvertToArray(data: Paper[]): GroupedData[] {
    const grouped = groupByExamTitle(data);
    return Object.entries(grouped).map(([title, papers]) => ({
        title,
        papers
    }));
}

export default function QuestionPapersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [groupedData, setGroupedData] = useState<GroupedData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchQuestionPapers = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/question-papers?limit=300')
                if (!response.ok) {
                    throw new Error('Failed to fetch question papers');
                }
                const data = await response.json()
                const convertedData = groupAndConvertToArray(data.docs)
                setGroupedData(convertedData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchQuestionPapers()
    }, [])

    const filteredData = groupedData.map(group => ({
        ...group,
        papers: group.papers.filter(paper =>
            paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.year.toString().includes(searchTerm) ||
            group.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(group => group.papers.length > 0)

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <p>Loading question papers...</p>
        </div>
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500">{error}</p>
        </div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <main className="flex-grow container mx-auto px-4 py-8">
                <SectionHeading>PYQS</SectionHeading>
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <Input
                            type="text"
                            placeholder="Search by exam, title, or year..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredData.map((data, idx) => (
                        <Accordion
                            key={`${data.title}-${idx}`}
                            type="single"
                            collapsible
                            className="w-full"
                        >
                            <AccordionItem value={`item-${idx}`}>
                                <AccordionTrigger className="text-xl font-semibold text-[#10375C] hover:text-[#1E4E6F]">
                                    {data.title}
                                </AccordionTrigger>
                                <AccordionContent className='!max-h-[200px] overflow-y-auto'>
                                    <div className="space-y-4">
                                        {data.papers.map((paper) => (
                                            <div key={paper.id} className="flex items-center">
                                                <FileText className="mr-2 text-[#F3C623]" />
                                                <a
                                                    href={paper.PaperPdf.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#1E4E6F] cursor-pointer hover:text-[#10375C] hover:underline transition-colors duration-200"
                                                >
                                                    {paper.title} ({paper.year})
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>

                {
                    filteredData.length === 0 && (
                        <p className="text-center text-gray-500 mt-8">
                            No question papers found matching your search criteria.
                        </p>
                    )
                }
            </main >
            <section className="py-10 mt-auto bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Need More Resources?
                    </h2>
                    <p className="text-lg text-white mb-6">
                        Check out our comprehensive study materials and mock tests.
                    </p>
                    <Button className="!bg-[#F3C623] text-white hover:bg-[#EB8317] transition-all duration-300 hover:scale-105">
                        <Link
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=co.white.tqqcq"
                            rel="noopener noreferrer"
                        >
                            Explore Study Materials
                        </Link>
                    </Button>
                </div>
            </section>
        </div >
    )
}