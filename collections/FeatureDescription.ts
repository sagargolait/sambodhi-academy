import { CollectionConfig } from "payload";

export const FeatureDescriptions: CollectionConfig = {
  slug: "feature-descriptions",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "Icon",
      type: "upload",
      relationTo: "media",
    },
  ],
  timestamps: true,
};
