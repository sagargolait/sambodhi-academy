import React from "react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const Associates = () => {
  const associates = [
    {
      name: "Dr. Babasaheb Ambedkar Research and Training Institute (Barti), Pune",
      image: "/barti.jpg",
    },
    {
      name: "Mahatma Jyoti Phule Research and Training Institute (Mahajyoti) ",
      image: "/mahajyoti.png",
    },
    {
      name: "Tribal Research & Training Institute (TRTI)",
      image: "/logo-trti.png",
    },
    {
      name: "Chhatrapati Shahu Maharaj Research, Training and Human Development Institute (SARTHI)",
      image: "/sarthi_logo.png",
    },
  ];
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <SectionHeading>
          Our Associates and Facilitators from The Government
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {associates.map((associate, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Image
                  src={associate.image}
                  alt={associate.name}
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-[#10375C]">
                  {associate.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Associates;
