import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components";
import ExamExplorer from "@/components/exploreExams";
import Testimonials from "@/components/testimonials";
import { CollectionSlug, getPayload } from 'payload';
import config from '@payload-config';
import FacultyCarousel from "@/components/FacultyCarousel";

const dynamicComponents = {
    CountDown: dynamic(() => import("@/components/CountDown"), { ssr: true }),
    Features: dynamic(() => import("@/components/Features"), { ssr: true }),
    Infrastructure: dynamic(() => import("@/components/Infrastructure"), { ssr: true }),
    Articles: dynamic(() => import("@/components/Articles"), { ssr: true }),
    FAQs: dynamic(() => import("@/components/FAQs"), { ssr: true }),
    Associates: dynamic(() => import("@/components/Associates"), { ssr: true })
};

async function fetchPageData(payload: any) {
    const collections = [
        { name: 'associates', sort: null },
        { name: 'exams', sort: 'order' },
        { name: 'testimonials', sort: null },
        { name: 'faqs', sort: null },
        { name: 'galleries', sort: null },
        { name: 'feature-descriptions', sort: null },
        { name: 'faculty', sort: null },
        { name: 'announcements', sort: null },
        { name: 'articles', sort: null }

    ];

    const results = await Promise.all(
        collections.map(({ name, sort }) =>
            payload.find({
                collection: name as CollectionSlug,
                depth: 2,
                limit: 30,
                ...(sort && { sort })
            })
        )
    );



    return {
        associates: results[0].docs,
        exams: results[1].docs,
        testimonials: results[2].docs,
        faqs: results[3].docs,
        galleryImages: results[4].docs,
        features: results[5].docs,
        faculties: results[6].docs,
        announcements: results[7].docs,
        articles: results[8].docs
    };
}



export default async function Home() {
    const payload = await getPayload({ config });
    const data = await fetchPageData(payload);

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
            <Hero heroImages={data.galleryImages} announcements={data.announcements} />
            <dynamicComponents.Associates associates={data.associates} />
            <ExamExplorer exams={data.exams} />
            <dynamicComponents.CountDown />
            <dynamicComponents.Features features={data.features} />
            <dynamicComponents.Articles articles={data.articles} />
            <dynamicComponents.Infrastructure {...data.galleryImages} />
            <Testimonials testimonials={data.testimonials} />
            <FacultyCarousel faculties={data.faculties} />
            <dynamicComponents.FAQs faqs={data.faqs} />
        </div>
    );
}