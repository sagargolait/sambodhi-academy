import { BookOpenCheck, Building, GraduationCap } from 'lucide-react'
import { Users } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  end: number,
  duration: number;
}

const CountUpAnimation = ({ end, duration = 2000 }: Props) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTime = useRef(null)

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = timestamp - startTime.current

      if (progress < duration) {
        countRef.current = Math.min(end, Math.floor((progress / duration) * end))
        setCount(countRef.current)
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTime.current = null
      countRef.current = 0
    }
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

const CountDown = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <Users className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4 text-[#F3C623]" />
            <h3 className="text-xl md:text-3xl font-bold text-[#10375C]">
              <CountUpAnimation end={2300} />+
            </h3>
            <p className="text-sm md:text-base text-[#10375C]">Students Enrolled</p>
          </div>
          <div className="text-center">
            <GraduationCap className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4 text-[#F3C623]" />
            <h3 className="text-xl md:text-3xl font-bold text-[#10375C]">
              <CountUpAnimation end={30} />+
            </h3>
            <p className="text-sm md:text-base text-[#10375C]">Expert Teachers</p>
          </div>
          <div className="text-center">
            <BookOpenCheck className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4 text-[#F3C623]" />
            <h3 className="text-xl md:text-3xl font-bold text-[#10375C]">
              <CountUpAnimation end={10} />+
            </h3>
            <p className="text-sm md:text-base text-[#10375C]">Courses Offered</p>
          </div>
          <div className="text-center">
            <Building className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4 text-[#F3C623]" />
            <h3 className="text-xl md:text-3xl font-bold text-[#10375C]">
              <CountUpAnimation end={200} />+
            </h3>
            <p className="text-sm md:text-base text-[#10375C]">Successful Placements</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountDown