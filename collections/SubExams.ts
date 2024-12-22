import type { CollectionConfig, CollectionSlug } from "payload";

export const SubExams: CollectionConfig = {
  slug: "subExams",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "exam-logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "exam",
      type: "relationship",
      relationTo: "exams" as CollectionSlug,
    },
  ],
};
