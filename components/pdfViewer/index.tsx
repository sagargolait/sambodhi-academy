'use client'

import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PDFViewerProps {
    url: string
}

export default function PDFViewer({ url }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [zoomValue, setZoomValue] = useState(1.5)
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
    }

    return (
        <div className="flex flex-col items-center">
            <div className='flex justify-end w-full gap-4 items-center'>
                <span>Zoom</span>
                <Button size='xs' onClick={() => setZoomValue((prev) => prev + 0.5)}>
                    <Plus size={15} />
                </Button>
                <Button size='xs' onClick={() => setZoomValue((prev) => prev > 1 ? prev - 0.5 : prev)}>
                    <Minus size={15} />
                </Button>
            </div>
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                className="max-w-full overflow-auto"
            >
                <Page pageNumber={pageNumber} scale={zoomValue} renderTextLayer={false} />
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