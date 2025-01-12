import { useTranslations } from 'next-intl';
import React from 'react'


const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  return (
    <h2 className="text-3xl font-bold text-center mb-12 text-[#10375C] relative pb-4">
      {t(children)}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F3C623]"></span>
    </h2>
  );

}

export default SectionHeading