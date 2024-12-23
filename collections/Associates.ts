import type { CollectionConfig, CollectionSlug } from "payload";

export const Associates: CollectionConfig = {
  slug: "associates",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "Associates Name",
      type: "text",
      required: true,
    },
    {
      name: "Image",
      type: "upload",
      relationTo: "media" as CollectionSlug,
      required: true,
    },
  ],
};
