'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideFacebook, LucideInstagram, LucideTwitter, LucideYoutube, Phone } from "lucide-react";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { objectToArray } from "@/lib/utils";

// Define the props type
interface FooterProps {
  setShowFloatingFooter: (show: boolean) => void;
  addresses: DataFromCollectionSlug<CollectionSlug>[] | undefined;
}

const Footer: React.FC<FooterProps> = ({ setShowFloatingFooter, addresses }) => {
  const centers = addresses ? objectToArray(addresses) : []
  const primaryCenter = centers.filter((center) => center.isPrimary)[0];
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        setShowFloatingFooter(footerRect.top > window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <footer ref={footerRef} className="bg-[#10375C] text-[#F4F6FF] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#10375C] text-4xl flex items-center gap-4">
                  <Image
                    src={"/api/media/file/sambodhi-logo.png"}
                    width={25}
                    height={25}
                    alt="logo"
                    className="aspect-w-4 aspect-h-3"
                  />
                  Sambodhi Academy
                </CardTitle>
                <CardContent className="mt-2">
                  The Sambodhi Academy was founded by Mr. Bhimrao Hattiambire, on 14th October 1997. It was a turning point in his life and also in the lives of thousands of beneficiaries of his activities in the years that followed. Despite all ups and downs in his personal life, he has been relentlessly working in the social field, solving problems of people, effecting social reforms of various kinds.
                </CardContent>
              </CardHeader>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="hover:text-[#F3C623]">
                  Courses
                </Link>
              </li>
              {/* <li>
                <Link href="/exams" className="hover:text-[#F3C623]">
                  Exams
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="hover:text-[#F3C623]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#F3C623]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F3C623]">
                  Contact
                </Link>
              </li>
            </ul>

          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-[#F3C623]">
                  Mock Tests
                </Link>
              </li>
              {/* <li>
                <Link href="/" className="hover:text-[#F3C623]">
                  Live Classes
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#F3C623]">
                  Video Courses
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#F3C623]">
                  Ebooks
                </Link>
              </li> */}
              <li>
                <Link href="/products" className="hover:text-[#F3C623]">
                  Books
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>
              {
                primaryCenter ? `${primaryCenter.street}, ${primaryCenter.city}, ${primaryCenter.state}, ${primaryCenter.postalCode}` : ""
              }
            </p>
            <div className="flex gap-4 items-center mt-2">
              <a href={'tel:7507743322'} className="flex items-center text-sm font-bold">
                <Phone className="w-5 h-5 mr-1 " />
                7507743322
              </a>
              <a href={'tel:9561234031'} className="flex items-center text-sm font-bold">
                <Phone className="w-5 h-5 mr-1 " />
                9561234031
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/sambodhiapbn?mibextid=ZbWKwL"
                className="hover:text-[#F3C623] flex"
                target="_blank"
              >
                <LucideFacebook size={25} />

              </a>
              <a href="#" className="hover:text-[#F3C623]" target="_blank">
                <LucideTwitter size={25} />
              </a>
              <a href="https://www.instagram.com/sambodhi_academy/?igshid=ZDdkNTZiNTM%3D" target="_blank" className="hover:text-[#F3C623]">
                <LucideInstagram size={25} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCOUbtszMJ-3A6TK3fl0ksUQ"
                className="hover:text-[#F3C623]"
                target="_blank"
              >
                <LucideYoutube size={25} />
              </a>
            </div>
            <div className="mt-4">
              <Link
                target="_blank"
                href="https://play.google.com/store/apps/details?id=co.white.tqqcq"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/google-play-logo.svg"}
                  width={150}
                  height={75}
                  alt="google-play-btn"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Our Centers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {centers.map((center) => (
              <div key={center.id} className="mb-4">
                <h4 className="font-semibold text-[#F3C623]">{center.city}</h4>
                <p className="text-sm">{`${center.street}, ${center.state}, ${center.postalCode}`}</p>
                <a href={`tel:${center.phoneNumber}`} className="flex items-center mt-2 text-sm font-bold">
                  <Phone className="w-3 h-3 mr-1 " />
                  {center.phoneNumber}
                </a>
                <div className="md:h-full overflow-hidden">
                  <iframe
                    className="mt-4"
                    src={center.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Sambodhi Academy Location"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p>
            &copy; 2024 Sambodhi Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
