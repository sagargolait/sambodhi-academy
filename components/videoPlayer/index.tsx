'use client'

import React from 'react'

interface VideoPlayerProps {
    url: string
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    return (
        <div className="aspect-w-16 aspect-h-9">
            <video
                src={url}
                controls
                className="w-full h-full object-cover"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    )
}