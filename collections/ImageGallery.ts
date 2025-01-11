import { CollectionConfig } from "payload";

export const ImageGallery: CollectionConfig = {
  slug: "galleries",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "location", "publishedAt"],
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
      name: "location",
      type: "select",
      options: [
        { label: "Hingoli", value: "hingoli" },
        { label: "Pune", value: "Pune" },
        { label: "Parbhani", value: "parbhani" },
        { label: "Chhatrapati Sambhaji Nagar", value: "aurangabad" },
      ],
    },
    {
      name: "type",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Classroom", value: "Classroom" },
        { label: "Lab", value: "Lab" },
        { label: "Events", value: "Events" },
        { label: "Campus", value: "Campus" },
        { label: "Faculty", value: "Faculty" },
        { label: "Hero", value: "Hero" },
      ],
    },
    {
      name: "customCategory",
      type: "text",
      label: "Custom Category",
      admin: {
        description:
          "Add a custom category if the predefined options do not fit.",
      },
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
