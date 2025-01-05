// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb"; // database-adapter-import
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Exams } from "./collections/Exams";
import { s3Storage } from "@payloadcms/storage-s3";
import { Courses } from "./collections/Courses";
import { Associates } from "./collections/Associates";
import { Testimonials } from "./collections/Testimonials";
import { Faqs } from "./collections/Faqs";
import { News } from "./collections/News";
import { Articles } from "./collections/Articles";
import { Notifications } from "./collections/Notifications";
import { ImageGallery } from "./collections/ImageGallery";
import { Addresses } from "./collections/Address";
import { ExamPages } from "./collections/ExamsPage";
import { GovernmentSchemes } from "./collections/GovtSchemes";
import { Events } from "./collections/Events";
import StudentInquiries from "./collections/StudentInquiries";
import CareerOpenings from "./collections/CareerOpenings";
import JobApplications from "./collections/JobApplications";
import { Announcements } from "./collections/Announcements";
import { FeatureDescriptions } from "./collections/FeatureDescription";
import Faculty from "./collections/Faculty";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Exams,
    Courses,
    Associates,
    Testimonials,
    Faqs,
    News,
    Articles,
    Notifications,
    ImageGallery,
    Addresses,
    ExamPages,
    GovernmentSchemes,
    Events,
    StudentInquiries,
    CareerOpenings,
    JobApplications,
    Announcements,
    FeatureDescriptions,
    Faculty,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.NEXT_PUBLIC_MONGODB_URI || "",
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
      },
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.NEXT_PUBLIC_S3_REGION,
        endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
      },
    }),
    // storage-adapter-placeholder
  ],
});
