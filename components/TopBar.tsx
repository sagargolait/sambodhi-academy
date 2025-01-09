'use client'

import { Button } from '@/components/ui/button'
import { Phone, Mail, Download, Send } from 'lucide-react'
import Link from 'next/link'

export default function TopBar() {
  return (

    <div className="bg-[#F3C623] text-[#10375C] py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-2">
          <a href={'tel:7507743322'} className="flex items-center text-sm font-bold">
            <Phone className="w-5 h-5 mr-1 " />
            7507743322
          </a>
          <a href={'tel:9561234031'} className="flex items-center text-sm font-bold">
            <Phone className="w-5 h-5 mr-1 " />
            9561234031
          </a>
          <a href={'mailto:sambodhiinquiry@gmail.com'} className="flex items-center text-sm font-bold">
            <Mail className="w-5 h-5 mr-1" />
            sambodhiinquiry@gmail.com
          </a>
        </div>
        <div className='flex gap-4'>
          <Link target='_blank' href="https://t.me/sambodhiacademy" rel="noopener noreferrer">
            <Button variant="default" size="sm" className="bg-[#10375C] hidden md:flex text-[#F4F6FF] hover:bg-[#EB8317]">
              <Send className="inline-block mr-2 h-5 w-5" />
              Join our Telegram Group
            </Button>
          </Link>
          <Link target='_blank' href="https://play.google.com/store/apps/details?id=co.white.tqqcq" rel="noopener noreferrer">
            <Button variant="default" size="sm" className="bg-[#10375C] hidden md:flex text-[#F4F6FF] hover:bg-[#EB8317]">
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}