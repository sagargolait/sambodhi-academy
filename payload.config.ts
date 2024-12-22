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
import { SubExams } from "./collections/SubExams";
import { Courses } from "./collections/Courses";
import Page from "./collections/Page";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Exams, SubExams, Courses, Page],
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
