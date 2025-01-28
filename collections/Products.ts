import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
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
      name: "productType",
      type: "select",
      required: true,
      options: [
        { label: "Mock Test", value: "mock-test" },
        { label: "Book", value: "book" },
      ],
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "price",
      type: "number",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "thumbnailImage",
      type: "upload",
      relationTo: "media",
    },
    // Common metadata
    {
      name: "metadata",
      type: "group",
      admin: {
        position: "sidebar", // Display in the sidebar for easier access in the admin panel
        description: "SEO Content",
      },
      fields: [
        {
          name: "seoTitle",
          type: "text",
        },
        {
          name: "seoDescription",
          type: "textarea",
        },
        {
          label: "Upload MockTest PDF",
          name: "mock_test_pdf",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "link",
          type: "text",
          required: true,
        },
        {
          name: "tags",
          type: "array",
          fields: [
            {
              name: "tag",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
