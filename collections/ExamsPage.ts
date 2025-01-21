import { CollectionConfig } from "payload";
import { slugField } from "./Exams";

export const ExamPages: CollectionConfig = {
  slug: "exam-pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "createdAt"],
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
    slugField,
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "draft",
          label: "Draft",
        },
        {
          value: "published",
          label: "Published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "blocks",
      blocks: [
        {
          slug: "heading",
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
            },
            {
              name: "level",
              type: "select",
              options: [
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
              ],
              defaultValue: "h1",
            },
          ],
        },
        {
          slug: "paragraph",
          fields: [
            {
              name: "text",
              type: "richText",
              required: true,
            },
          ],
        },
        {
          slug: "image",
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
          slug: "pdf-viewer", // unique identifier for the block
          labels: {
            singular: "PDF Viewer",
            plural: "PDF Viewers",
          },
          fields: [
            {
              name: "pdf",
              type: "upload", // Use the 'upload' field type for file uploads
              relationTo: "media", // Assuming you have a 'media' collection for uploads
              required: true,
            },
            {
              name: "title",
              type: "text",
              label: "Title",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
            },
          ],
        },
        {
          slug: "examQuestion",
          fields: [
            {
              name: "question",
              type: "richText",
              required: true,
            },
            {
              name: "options",
              type: "array",
              fields: [
                {
                  name: "option",
                  type: "text",
                  required: true,
                },
                {
                  name: "isCorrect",
                  type: "checkbox",
                  defaultValue: false,
                },
              ],
            },
            {
              name: "explanation",
              type: "richText",
            },
          ],
        },
        {
          slug: "table",
          fields: [
            {
              name: "tableCaption",
              type: "text",
              label: "Table Caption",
            },
            {
              name: "rows",
              type: "array",
              fields: [
                {
                  name: "cells",
                  type: "array",
                  fields: [
                    {
                      name: "content",
                      type: "richText",
                      required: true,
                    },
                    {
                      name: "isHeader",
                      type: "checkbox",
                      label: "Is Header Cell",
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
            {
              name: "style",
              type: "select",
              options: [
                {
                  label: "Default",
                  value: "default",
                },
                {
                  label: "Striped",
                  value: "striped",
                },
                {
                  label: "Bordered",
                  value: "bordered",
                },
              ],
              defaultValue: "default",
            },
          ],
        },
        {
          slug: "link",
          labels: {
            singular: "Link Block",
            plural: "Link Blocks",
          },
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
              label: "Link Text",
              admin: {
                description: "The text that will be displayed",
              },
            },
            {
              name: "pdfFile",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "PDF File",
              filterOptions: {
                mimeType: { contains: "pdf" },
              },
            },
            {
              name: "openInNewTab",
              type: "checkbox",
              label: "Open in New Tab",
              defaultValue: true,
            },
            {
              name: "style",
              type: "select",
              options: [
                {
                  label: "Default",
                  value: "default",
                },
                {
                  label: "Button",
                  value: "button",
                },
                {
                  label: "Underlined",
                  value: "underlined",
                },
              ],
              defaultValue: "default",
            },
          ],
        },
      ],
    },
    {
      name: "meta",
      type: "group",
      fields: [
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "keywords",
          type: "text",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
