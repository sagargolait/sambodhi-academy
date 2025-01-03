import { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
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
