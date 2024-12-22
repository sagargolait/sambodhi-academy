import { Block } from "payload";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content",
    plural: "Content Blocks",
  },
  fields: [
    {
      name: "content",
      type: "richText",
    },
  ],
};

export default Content;
