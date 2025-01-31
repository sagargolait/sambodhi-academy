import { CollectionConfig } from "payload";

export const Announcements: CollectionConfig = {
  slug: "announcements",
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
      localized: true,
      required: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
  ],
  timestamps: true,
};
