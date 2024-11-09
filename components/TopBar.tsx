'use client'

import { Button } from '@/components/ui/button'
import { Phone, Mail, Download, Send } from 'lucide-react'
import Link from 'next/link'

export default function TopBar() {
  return (

    <div className="bg-[#F3C623] text-[#10375C] py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href={'tel:0240297990'} className="flex items-center text-sm font-bold">
            <Phone className="w-5 h-5 mr-1 " />
            (0240) 297 0990
          </a>
          <a href={'mailto:sambodhipbn@gmail.com'} className="flex items-center text-sm font-bold">
            <Mail className="w-5 h-5 mr-1" />
            sambodhiapbn@gmail.com
          </a>
        </div>
        <div className='flex gap-4'>
          <Link target='_blank' href="https://t.me/sambodhimpsc" rel="noopener noreferrer">
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