'use client'

import { useEffect, useRef, useState } from 'react'

interface NotificationStripProps {
  messages: {
    message: string
    link: string
  }[]
}

export function NotificationStrip() {
  const [animationDuration, setAnimationDuration] = useState(0)
  const [messages, setMessages] = useState<NotificationStripProps[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchNotificationMessages = async () => {
      try {
        const response = await fetch('/api/notifications')
        const data = await response.json()
        setMessages(data.docs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNotificationMessages()
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const contentWidth = containerRef.current.scrollWidth
      const duration = (contentWidth / 50) * 1000 // 50 pixels per second
      setAnimationDuration(duration)
    }
  }, [messages])

  if(messages.length === 0) return null

  return (
    <div className="bg-primary text-white py-1 overflow-hidden">
      <div
        ref={containerRef}
        className="whitespace-nowrap"
        style={{
          animation: `scroll ${animationDuration}ms linear infinite`,
        }}
      >
        {messages.map((message: any, index: number) => (
          <a href={message.link} key={index} className="inline-block underline mx-2 text-sm  text-[#F3C623]">
            {message.message}
          </a>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}