'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Loader } from 'lucide-react'

export function WhatsNewSection() {
  const [announcements, setAnnouncements] = useState<{ id: string; title: string; link: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAnnouncements() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/announcements')
        const data = await response.json()
        setAnnouncements(data.docs)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnnouncements()
  }, [])

  return (
    <div className="bg-[#10375C] h-[550px] text-white p-6 m-4 w-full lg:w-1/4 rounded-lg shadow-lg border border-[#F3C623] relative">
      <h2 className="text-3xl font-bold mb-4 text-[#F3C623]">What&apos;s New</h2>
      <div className="mb-2">
        <h3 className="text-xl font-semibold mb-4 text-white">Registrations Open</h3>
      </div>
      <div className="relative h-[330px] overflow-auto">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-[#F3C623]" />
          </div>
        ) : (
          <div className="absolute w-full transition-transform duration-1000 ease-linear">
            {announcements.map((announcement) => (
              <div key={`${announcement.id}`} className="mb-4">
                <Link
                  href={announcement.link}
                  className="flex items-start space-x-2 hover:text-[#F3C623] transition-colors"
                >
                  <span className="mt-1.5">•</span>
                  <span>{announcement.title}</span>
                </Link>
              </div>
            ))}
          </div>
        )}
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