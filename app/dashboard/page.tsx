"use client";

import React, { useState } from "react";
import {
  Hero,
  Features,
  SuccessStories,
  Infrastructure,
  NotificationsAndArticles,
  OurStory,
  FAQs,
  RequestCounseling,
  MobileMenu,
} from "@/components";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
      <Hero />
      <Features />
      <SuccessStories />
      <Infrastructure />
      {/* <VideoLectures /> */}
      <NotificationsAndArticles />
      <OurStory />
      <FAQs />
      <RequestCounseling />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
