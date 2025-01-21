import type { CollectionConfig, Field } from "payload";

// Define the Exam document type
interface ExamDocument {
  id: string;
  title: string;
  slug: string;
  logo?: {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width?: number;
    height?: number;
    url: string;
  };
}

// Define hook types
type BeforeValidateHook = (args: {
  data?: Partial<ExamDocument>;
  originalDoc?: ExamDocument;
  req?: any;
}) => string | Promise<string>;

// Slugify utility function
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Slug field configuration with TypeScript
export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  admin: {
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      (({ data }) => {
        if (!data?.slug && data?.title) {
          return slugify(data.title);
        }
        return data?.slug || "";
      }) as BeforeValidateHook,
    ],
  },
  validate: (val: any) => {
    if (typeof val !== "string") {
      return "Slug must be a string";
    }
    if (!/^[a-zA-Z0-9-]+$/.test(val)) {
      return "Slug must contain only letters, numbers, and hyphens";
    }
    return true;
  },
};

// Main collection configuration
export const Exams: CollectionConfig = {
  slug: "exams",
  access: {
    read: (): boolean => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Exam Name",
    },
    {
      name: "order",
      type: "number",
      required: true,
      admin: {
        position: "sidebar", // Display in the sidebar for easier access in the admin panel
        description:
          "Controls the display order of exams. Lower numbers appear first.",
      },
    },
    slugField,
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
