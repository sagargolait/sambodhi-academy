import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components";
import ExamExplorer from "@/components/exploreExams";
import Testimonials from "@/components/testimonials";
import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'
// Dynamic imports for other components
const CountDown = dynamic(() => import("@/components/CountDown"));
// const Courses = dynamic(() => import("@/components/Courses"));
const Features = dynamic(() => import("@/components/Features"));
const Infrastructure = dynamic(() => import("@/components/Infrastructure"));
// const VideoLectures = dynamic(() => import("@/components/VideoLectures"));
const NotificationsAndArticles = dynamic(
    () => import("@/components/NotificationsAndArticles")
);
const FAQs = dynamic(() => import("@/components/FAQs"));
// const RequestCounseling = dynamic(
//     () => import("@/components/RequestCounseling")
// );
const Associates = dynamic(() => import("@/components/Associates"));



export default async function Home() {
    const payload = await getPayload({ config })
    const [associates, exams, testimonials, faqs, galleryImages] = await Promise.all([
        payload.find({
            collection: 'associates' as CollectionSlug,
            depth: 2
        }),
        payload.find({
            collection: 'exams' as CollectionSlug,
            depth: 2
        }),
        payload.find({
            collection: 'testimonials' as CollectionSlug,
            depth: 2
        }),
        payload.find({
            collection: 'faqs' as CollectionSlug,
            depth: 2
        }),
        payload.find({
            collection: 'galleries' as CollectionSlug,
            depth: 2
        })
    ])

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <Hero {...galleryImages.docs} />

            <Associates {...associates.docs} />
            {/* <OurStory /> */}
            <ExamExplorer {...exams.docs} />
            <CountDown />
            <Features />
            <NotificationsAndArticles />
            {/* <SuccessStories /> */}
            <Infrastructure {...galleryImages.docs} />
            {/* <VideoLectures /> */}
            <Testimonials {...testimonials.docs} />
            <FAQs {...faqs.docs} />
            {/* <RequestCounseling /> */}
        </div>
    );
}
