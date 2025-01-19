'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CustomImageProps {
  src?: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean,
  loading?: 'eager' | 'lazy',
  onClick?: () => void,
  priority?: boolean,
  objectFit?: string
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  className,
  fill,
  loading,
  onClick,
  priority,
  objectFit
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
      fill={fill}
      loading={loading}
      className={className}
      onError={() => setError(true)}
      onClick={onClick ? () => onClick() : undefined}
      objectFit={objectFit}
      priority={priority}
    />
  )
}