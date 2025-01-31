import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components";
import ExamExplorer from "@/components/exploreExams";
import Testimonials from "@/components/testimonials";
import { CollectionSlug, getPayload } from 'payload';
import config from '@payload-config';
import FacultyCarousel from "@/components/FacultyCarousel";
import ErrorBoundary from "./ErrorBoundary";

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
        { name: 'galleries', sort: 'displayOrder' },
        { name: 'feature-descriptions', sort: null },
        { name: 'faculty', sort: 'order' },
        { name: 'announcements', sort: null },
        { name: 'articles', sort: null },
        { name: 'statistics', sort: null }

    ];

    const results = await Promise.all(
        collections.map(({ name, sort }) =>
            payload.find({
                collection: name as CollectionSlug,
                depth: 2,
                limit: 30,
                locale: 'en',
                fallbackLocale: true,
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
        articles: results[8].docs,
        statistics: results[9].docs
    };
}



export default async function Home() {
    const payload = await getPayload({ config });
    const data = await fetchPageData(payload);

    return (
        <ErrorBoundary>
            <div className="flex flex-col min-h-screen bg-[#F4F6FF]">
                <Hero heroImages={data.galleryImages} announcements={data.announcements} />
                <dynamicComponents.Associates associates={data.associates} />
                <ExamExplorer exams={data.exams} />
                <dynamicComponents.CountDown statistics={data.statistics} />
                <FacultyCarousel faculties={data.faculties} />
                {/* <dynamicComponents.Features features={data.features} /> */}
                {/* <dynamicComponents.Articles articles={data.articles} /> */}
                <dynamicComponents.Infrastructure {...data.galleryImages} />
                <Testimonials testimonials={data.testimonials} />
                <dynamicComponents.FAQs faqs={data.faqs} />
            </div>
        </ErrorBoundary>
    );
}