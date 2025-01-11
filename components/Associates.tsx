import React from "react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import Link from "next/link";

interface AssociatesProps {
  associates: DataFromCollectionSlug<CollectionSlug>[]
}

const Associates: React.FC<AssociatesProps> = ({ associates }) => {
  console.log(associates)
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <SectionHeading>
          Empanelment From
        </SectionHeading>
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
          {associates.map((associate: any) => (
            <Link href={`/associates/${associate.slug}`} key={associate.id}>
              <Card className="text-center md:h-[350px]">
                <CardContent className="pt-6">
                  <Image
                    src={associate.Image.url}
                    alt={associate.Image.alt}
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-md hidden lg:block font-semibold text-[#10375C]">
                    {associate['Associates Name']}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Associates;
