'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Search } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'



export default function QuestionPapersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [questionPapers, setQuestionPapers] = useState([])

    useEffect(() => {
        const fetchQuestionPapers = async () => {
            const response = await fetch('/api/question-papers')
            const data = await response.json()
            setQuestionPapers(data.docs)
        }

        fetchQuestionPapers()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <main className="flex-grow container mx-auto px-4 py-8">
                <SectionHeading>Previous Year Question Papers</SectionHeading>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {questionPapers.map((paper: any) => (
                        <Card key={paper.id} className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center text-[#10375C]">
                                    <FileText className="mr-2" />
                                    {paper.title} - {paper.year}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">{paper.description}</p>
                                <Button
                                    className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                                    onClick={() => window.open(paper.PaperPdf.url, '_blank')}
                                >
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {questionPapers.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No question papers found matching your search criteria.</p>
                )}
            </main>

        </div>
    )
}