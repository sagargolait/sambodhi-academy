'use client';

import { BookOpenCheck, Building, GraduationCap } from "lucide-react";
import { Users } from "lucide-react";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  duration?: number;
}

interface StatisticsProps {
  statistics: DataFromCollectionSlug<CollectionSlug>[]
}

const CountUpAnimation = ({ end, duration = 2000 }: Props) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;

      if (progress < duration) {
        countRef.current = Math.min(
          end,
          Math.floor((progress / duration) * end)
        );
        setCount(countRef.current);
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTime.current = null;
      countRef.current = 0;
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const CountDown: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((item: any) => (
            <>
              <div className="text-center">
                <Users className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4 text-[#F3C623]" />
                <h3 className="text-xl md:text-3xl font-bold text-[#10375C]">
                  <CountUpAnimation end={item.value} />{item.suffix}
                </h3>
                <p>{item.label}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountDown;
