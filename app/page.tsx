"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Hero, OurStory } from "@/components";

// Dynamic imports for other components
const CountDown = dynamic(() => import("@/components/CountDown"));
const Courses = dynamic(() => import("@/components/Courses"));
const Features = dynamic(() => import("@/components/Features"));
const Infrastructure = dynamic(() => import("@/components/Infrastructure"));
const VideoLectures = dynamic(() => import("@/components/VideoLectures"));
const NotificationsAndArticles = dynamic(
  () => import("@/components/NotificationsAndArticles")
);
const FAQs = dynamic(() => import("@/components/FAQs"));
const RequestCounseling = dynamic(
  () => import("@/components/RequestCounseling")
);
const Associates = dynamic(() => import("@/components/Associates"));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
      <Hero />
      <OurStory />
      <CountDown />
      <Courses />
      <Features />
      <NotificationsAndArticles />
      {/* <SuccessStories /> */}
      <Infrastructure />
      <VideoLectures />
      <Associates />
      <FAQs />
      <RequestCounseling />
    </div>
  );
}
