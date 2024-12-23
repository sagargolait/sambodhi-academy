import { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
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
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Success", value: "success" },
        { label: "Error", value: "error" },
      ],
      required: true,
    },
    {
      name: "isRead",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  timestamps: true,
};
