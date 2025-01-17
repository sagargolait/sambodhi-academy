import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
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
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "isStale",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
