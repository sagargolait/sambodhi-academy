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
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "location",
      type: "select",
      localized: true, // Ensure the field itself is localized
      options: [
        { label: "Hingoli", value: "hingoli" },
        { label: "Pune", value: "pune" },
        { label: "Parbhani", value: "parbhani" },
        {
          label: "Chhatrapati Sambhaji Nagar",
          value: "Chhatrapati Sambhaji Nagar",
        },
        { label: "None", value: "none" },
      ],
      hooks: {
        afterRead: [
          ({ value, req }) => {
            const locale: string = req?.locale || "en"; // ✅ Get the locale

            if (locale === "mr") {
              const translations = {
                hingoli: "हिंगोली",
                pune: "पुणे",
                parbhani: "परभणी",
                "Chhatrapati Sambhaji Nagar": "छत्रपती संभाजी नगर",
                none: "कोणतेही नाही",
              };
              return translations[value as keyof typeof translations] || value; // ✅ Translate only on read
            }

            return value; // ✅ Keep original value in database
          },
        ],
      },
    },
    {
      name: "type",
      type: "text",
      localized: true,
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
