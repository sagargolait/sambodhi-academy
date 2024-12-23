'use client';

import React from "react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { objectToArray } from "@/lib/utils";



const Associates = (associates: DataFromCollectionSlug<CollectionSlug>[]) => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <SectionHeading>
          Our Associates and Facilitators from The Government
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {objectToArray(associates).map((associate: any) => (
            <Card key={associate.id} className="text-center">
              <CardContent className="pt-6">
                <Image
                  src={associate.Image.url}
                  alt={associate.Image.alt}
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-[#10375C]">
                  {associate['Associates Name']
                  }
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
