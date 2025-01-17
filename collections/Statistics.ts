import { CollectionConfig } from "payload";

const Statistics: CollectionConfig = {
  slug: "statistics",
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
      name: "value",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "suffix",
      type: "text",
      defaultValue: "+",
    },
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default Statistics;
