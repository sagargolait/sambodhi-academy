'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CustomImageProps {
  src?: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  className
}: CustomImageProps) {
  const [error, setError] = useState(false)

  const placeholderUrl = "/api/media/file/placeholder.webp"
  const imageSource = error || !src ? placeholderUrl : src

  return (
    <Image
      src={imageSource}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  )
}