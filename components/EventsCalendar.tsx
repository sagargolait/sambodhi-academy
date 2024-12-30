'use client'

import { useState, useEffect } from 'react'
import { format, isSameDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
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

            <button className={`rdp-button_reset rdp-button h-8 w-8 p-0 font-normal aria-selected:opacity-100 ${event ? 'bg-[#F3C623] text-[#10375C] font-bold' : ''}`}>
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
          variant={"outline"}
          className={`md:w-[120px] w-[40px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? 'Events' : <span>Pick a date</span>}
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