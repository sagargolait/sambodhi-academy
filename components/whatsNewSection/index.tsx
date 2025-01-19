'use client'
import Link from 'next/link'

export function WhatsNewSection({ announcements }: any) {
  return (
    <div className="bg-[#10375C] max-h-[550px] h-full text-white p-4 m-4 !mt-0 w-full md:!mt-4 lg:w-1/4 rounded-lg shadow-lg border border-[#F3C623] relative">
      <h2 className="text-3xl font-bold mb-4 text-[#F3C623]">What&apos;s New</h2>
      <div className="mb-2">
        <h3 className="text-xl font-semibold mb-4 text-white">Registrations Open</h3>
      </div>
      <div className="relative !max-h-[330px] min-h-[150px] w-full overflow-auto">

        <div className="absolute w-full transition-transform duration-1000 ease-linear">
          {announcements.map((announcement: any) => (
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
      </div>
    </div>
  )
}