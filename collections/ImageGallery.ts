import { CollectionConfig } from "payload";

export const ImageGallery: CollectionConfig = {
  slug: "galleries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Classroom", value: "Classroom" },
        { label: "Lab", value: "Lab" },
        { label: "Events", value: "Events" },
        { label: "Campus", value: "Campus" },
        { label: "Faculty", value: "Faculty" },
      ],
    },
    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
        {
          name: "altText",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "publishedAt",
      type: "date",
      defaultValue: () => new Date(),
    },
  ],
};
