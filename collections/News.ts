import { isValidURL } from "@/lib/utils";
import type { CollectionConfig, CollectionSlug } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "News Title",
    },
    {
      name: "content",
      type: "richText",
      label: "News Content",
    },
    {
      name: "publisherName",
      type: "text",
      required: true,
    },
    {
      name: "newsPaperImg",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      label: "Published Date",
    },
    {
      name: "externalLink",
      type: "text",
      label: "External Link",
      validate: (value: any) => {
        if (value && !isValidURL(value)) {
          return "Please enter a valid URL";
        }
        return true;
      },
      required: true,
    },
  ],
};
