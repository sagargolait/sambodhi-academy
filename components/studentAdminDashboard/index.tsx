'use client'

import React, { useState } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar"
import { ChevronDown, FileText, Key, Video } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import PDFViewer from '../pdfViewer'
import VideoPlayer from '../videoPlayer'

const sidebarItems = [
  {
    label: 'Previous Year Question Papers',
    icon: FileText,
    items: [
      { year: '2023', url: '/api/media/file/CGL%202023.pdf' },
      { year: '2022', url: '/path/to/2022-question-paper.pdf' },
      { year: '2021', url: '/path/to/2021-question-paper.pdf' },
    ]
  },
  {
    label: 'Answer Keys',
    icon: Key,
    items: [
      { year: '2023', url: '/path/to/2023-answer-key.pdf' },
      { year: '2022', url: '/path/to/2022-answer-key.pdf' },
      { year: '2021', url: '/path/to/2021-answer-key.pdf' },
    ]
  },
  {
    label: 'Paid Video Lectures',
    icon: Video,
    items: [
      { title: 'Introduction to Public Administration', url: '/path/to/video1.mp4' },
      { title: 'Constitutional Law Basics', url: '/path/to/video2.mp4' },
      { title: 'Economics for Civil Services', url: '/path/to/video3.mp4' },
    ]
  },
]

export default function StudentAdminLayout({ children }: { children: React.ReactNode }) {
  const [selectedContent, setSelectedContent] = useState<{ type: string; url: string } | null>(null)

  const handleContentSelect = (type: string, url: string) => {
    setSelectedContent({ type, url })
  }

  return (
    <SidebarProvider >
      <div className="flex w-full h-screen">
        <Sidebar className="w-64 !bg-[#10375C] text-white">
          <SidebarHeader>
            <h2 className="text-xl font-bold p-4 text-[#F3C623]">Student Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            {sidebarItems.map((item, index) => (
              <SidebarGroup key={index}>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="cursor-pointer hover:bg-[#ccc] transition-colors">
                      <item.icon className="w-4 h-4 mr-2 text-[#F3C623]" />
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-auto text-[#F3C623]" />
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((subItem: any, subIndex) => (
                          <SidebarMenuItem key={subIndex}>
                            <SidebarMenuButton
                              onClick={() => handleContentSelect(
                                item.label === 'Paid Video Lectures' ? 'video' : 'pdf',
                                subItem.url
                              )}
                              className="hover:bg-[#ccc] text-black ml-8 transition-colors"
                            >
                              {subItem.year || subItem.title}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6 overflow-auto bg-white">
          {selectedContent ? (
            selectedContent.type === 'pdf' ? (
              <PDFViewer url={'/api/media/file/CGL%202023.pdf'} />
            ) : (
              <VideoPlayer url={selectedContent.url} />
            )
          ) : (
            children
          )}
        </main>
      </div>
    </SidebarProvider>
  )
}