'use client'

import { useState, useEffect } from 'react'
import { format, isSameDay } from 'date-fns'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Event {
  id: string
  title: string
  date: string
  description?: string
  isStale?: boolean
}

export function EventCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data.docs))
      .catch(error => console.error('Error fetching events:', error))
  }, [])

  const getEventForDate = (date: Date) => {
    return events.find(event => isSameDay(new Date(event.date), date))
  }

  const renderDay = (day: Date) => {
    const event = getEventForDate(day)
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>

            <button className={`rdp-button_reset rdp-button h-8 w-8 p-0 font-normal aria-selected:opacity-100 ${event ? (event.isStale ? 'bg-[#d8d7d4] text-[#181819] font-bold' : 'bg-[#F3C623] text-[#10375C] font-bold') : ''}`}>
              {format(day, 'd')}
            </button>
          </TooltipTrigger>
          {event && (
            <TooltipContent side="bottom">
              <div className="max-w-xs">
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm">{event.description}</p>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className={`justify-start !p-0 hover:bg-transparent bg-transparent text-left font-normal ${!date && "text-muted-foreground"}`}
        >
          <div title='Upcoming Events' className="relative lg:mr-4">
            <Bell className="h-6 w-6  text-[#fff] hover:text-[#F3C623] cursor-pointer " />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {events.length}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          components={{
            Day: ({ date }) => renderDay(date),
          }}
        />
      </PopoverContent>
    </Popover>
  )
}