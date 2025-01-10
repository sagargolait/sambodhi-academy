'use client'

import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
    url: string
}

export default function PDFViewer({ url }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
    }

    return (
        <div className="flex flex-col items-center">
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                className="max-w-full"
            >
                <Page pageNumber={pageNumber} width={600} />
            </Document>
            <div className="flex items-center mt-4">
                <Button
                    onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                    disabled={pageNumber <= 1}
                    variant="outline"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <p className="mx-4">
                    Page {pageNumber} of {numPages}
                </p>
                <Button
                    onClick={() => setPageNumber(page => Math.min(page + 1, numPages || 1))}
                    disabled={pageNumber >= (numPages || 1)}
                    variant="outline"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}