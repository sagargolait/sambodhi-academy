import React from "react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "./ui/card";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import Link from "next/link";
import CustomImage from "@/utilities/CustomImage";

interface AssociatesProps {
  associates: DataFromCollectionSlug<CollectionSlug>[]
}

const Associates: React.FC<AssociatesProps> = ({ associates }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <SectionHeading>EmpanelmentFrom</SectionHeading>
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
          {associates.map((associate: any) => (
            <Link href={`/associates/${associate.slug}`} key={associate.id}>
              <Card className="text-center !p-4 md:h-[300px]">
                <CardContent className="pt-6">
                  <CustomImage
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
