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
      required: true,
    },
    {
      name: "answer",
      type: "text",
      required: true,
    },
  ],
};
