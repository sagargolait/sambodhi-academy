'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Custom404() {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement search functionality here
        console.log('Searching for:', searchQuery)
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="text-center">
                    <motion.h1
                        className="text-9xl font-bold text-[#10375C]"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        404
                    </motion.h1>
                    <motion.p
                        className="text-2xl mt-4 mb-8 text-[#1E4E6F]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Oops! The page you&apos;re looking for seems to have gone on a study break.
                    </motion.p>
                    <motion.div
                        className="flex flex-col items-center space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Search for content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-grow"
                            />
                            <Button type="submit" className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>
                        <p className="text-[#1E4E6F]">or</p>
                        <Link href="/">
                            <Button className="bg-[#10375C] text-white hover:bg-[#1E4E6F]">
                                Return to Homepage
                            </Button>
                        </Link>
                    </motion.div>
                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#F3C623" d="M39.5,-65.3C50.2,-56.7,57.1,-44.3,62.6,-31.3C68.1,-18.3,72.3,-4.7,71.8,9C71.4,22.7,66.3,36.5,57.4,47.7C48.5,58.9,35.8,67.5,21.7,72.1C7.6,76.7,-7.9,77.3,-22.1,73.4C-36.3,69.5,-49.2,61.1,-58.8,49.6C-68.4,38.1,-74.6,23.5,-76.9,8C-79.2,-7.5,-77.5,-23.9,-70.1,-37.1C-62.7,-50.3,-49.6,-60.3,-36,-67.1C-22.4,-73.9,-8.3,-77.5,3.9,-74.1C16.2,-70.7,28.8,-73.9,39.5,-65.3Z" transform="translate(100 100)" />
                        </svg>
                        <div className="relative -mt-40 text-center">
                            <span className="text-6xl">🤓</span>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}