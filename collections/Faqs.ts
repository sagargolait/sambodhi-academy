import type { CollectionConfig, CollectionSlug } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "question",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "answer",
      type: "text",
      localized: true,
      required: true,
    },
  ],
};
