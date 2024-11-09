import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { X, Menu } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#10375C] text-[#F4F6FF] md:hidden">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col items-center space-y-4 mt-8">
          <Link href="/courses" className="text-xl hover:text-[#F3C623]">Courses</Link>
          <Link href="/exams" className="text-xl hover:text-[#F3C623]">Exams</Link>
          <Link href="/about" className="text-xl hover:text-[#F3C623]">About</Link>
          <Link href="/contact" className="text-xl hover:text-[#F3C623]">Contact</Link>
          <Link href="/login">
            <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">Login</Button>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu