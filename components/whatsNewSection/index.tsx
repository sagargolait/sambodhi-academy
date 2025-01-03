'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const announcements = [
  {
    id: 1,
    title: "Download EPIC! November 2024 – The Monthly Current Affairs Magazine by ForumIAS",
    href: "#"
  },
  {
    id: 2,
    title: "State PSC Success Program (SPS) - UPPSC Mains Test Series 2024 | 5th Jan. 2024 | Available in English & Hindi Medium",
    href: "#"
  },
  {
    id: 3,
    title: "MGP 2026 | Cohort - 1 | English Medium | Starts on 28th Jan. 2025 | Enroll Now!",
    href: "#"
  },
  {
    id: 4,
    title: "MGP 2025 | Cohort 21 | Hindi Medium | Starts on 25th Dec. 2024 | Enroll Now!",
    href: "#"
  },
  {
    id: 5,
    title: "MGP 2025 | Cohort-18, 18 (Rapid) English Medium | Cohort 19 Hindi Medium | Starts on 15th Dec. 2024 | Enroll Now!",
    href: "#"
  }
]

export function WhatsNewSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1
        const containerHeight = containerRef.current?.clientHeight || 0
        const contentHeight = containerRef.current?.scrollHeight || 0
        return newPosition >= contentHeight ? 0 : newPosition
      })
    }, 50)

    return () => clearInterval(scrollInterval)
  }, [])

  return (
    <div className="bg-[#10375C] h-[550px] text-white p-6 m-4 w-full lg:w-1/4 rounded-lg shadow-lg border border-[#F3C623]">
      <h2 className="text-3xl font-bold mb-4 text-[#F3C623]">What&apos;s New</h2>
      <div className="mb-2">
        <h3 className="text-xl font-semibold mb-4 text-white">Registrations Open</h3>
      </div>
      <div className="relative h-[330px] overflow-hidden" ref={containerRef}>
        <div 
          className="absolute w-full transition-transform duration-1000 ease-linear"
          style={{ transform: `translateY(-${scrollPosition}px)` }}
        >
          {[...announcements, ...announcements].map((announcement, index) => (
            <div key={`${announcement.id}-${index}`} className="mb-4">
              <Link 
                href={announcement.href}
                className="flex items-start space-x-2 hover:text-[#F3C623] transition-colors"
              >
                <span className="mt-1.5">•</span>
                <span>{announcement.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Link 
        href="/announcements" 
        className="inline-flex items-center text-[#F3C623] hover:text-white transition-colors mt-4"
      >
        View All 
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  )
}