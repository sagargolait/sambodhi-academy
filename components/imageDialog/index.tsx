import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import CustomImage from '@/utilities/CustomImage';

type Props = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    allImages: any[],
    selectedImageIndex: number,
    previousImage: any
    nextImage: any
}

const ImageDialog = (props: Props) => {
    return (
        <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
            <DialogContent className="max-w-[90vw] h-[90vh] p-0" hideCloseButton={true}>
                <DialogTitle className="sr-only">
                    Image Gallery View
                </DialogTitle>
                <div className="relative w-full h-full flex items-center justify-center bg-black/50">
                    <CustomImage
                        src={props.allImages[props.selectedImageIndex]?.image.url}
                        alt={props.allImages[props.selectedImageIndex]?.image.alt}
                        fill
                        objectFit="contain"
                        className="max-h-full max-w-full object-contain"
                    />

                    <button
                        onClick={() => props.setIsOpen(false)}
                        className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white"
                        aria-label="Close dialog"
                    >
                        <X className="h-8 w-8" color="grey" />
                    </button>

                    <button
                        onClick={props.previousImage}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-8 w-8 rounded-full" color="grey" />
                    </button>

                    <button
                        onClick={props.nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-8 w-8 rounded-full" color="grey" />
                    </button>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImageDialog