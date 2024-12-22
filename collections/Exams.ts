import type { CollectionConfig, CollectionSlug } from "payload";

export const Exams: CollectionConfig = {
  slug: "exams",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "categories",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "exam",
      type: "join",
      on: "exam",
      collection: "subExams" as CollectionSlug,
    },
  ],
};
