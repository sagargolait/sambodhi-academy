import type { CollectionConfig, CollectionSlug } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "quote",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "Image",
      type: "upload",
      relationTo: "media" as CollectionSlug,
    },
  ],
};
