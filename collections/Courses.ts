import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Courses: CollectionConfig = {
  slug: "courses",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "Course Title",
      type: "text",
      required: true,
    },
    {
      name: "Course Description",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("Course Description", { name: "Course_Description_html" }),
  ],
};
