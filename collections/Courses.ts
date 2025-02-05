import type { CollectionConfig } from "payload";
import { slugField } from "./Exams";

export const Courses: CollectionConfig = {
  slug: "courses",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    slugField,
    {
      name: "CourseImage",
      type: "upload",
      relationTo: "media",
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
      ],
    },
  ],
};
