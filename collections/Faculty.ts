import { CollectionConfig } from "payload";

const Faculty: CollectionConfig = {
  slug: "faculty",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "department", "designation", "email"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Full name of the faculty member",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "profileImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "department",
      type: "select",
      required: true,
      options: [
        { label: "MPSC", value: "mpsc" },
        { label: "SSC", value: "ssc" },
        { label: "Police Bharti", value: "police-bharti" },
        // Add more departments as needed
      ],
    },
    {
      name: "designation",
      type: "select",
      required: true,
      options: [
        { label: "Professor", value: "professor" },
        { label: "Associate Professor", value: "associate-professor" },
        { label: "Assistant Professor", value: "assistant-professor" },
        { label: "Lecturer", value: "lecturer" },
      ],
    },
    {
      name: "qualifications",
      type: "array",
      fields: [
        {
          name: "degree",
          type: "text",
          required: true,
        },
        {
          name: "institution",
          type: "text",
          required: true,
        },
        {
          name: "year",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "specializations",
      type: "array",
      fields: [
        {
          name: "topic",
          type: "text",
        },
      ],
    },
    {
      name: "publications",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "journal",
          type: "text",
          required: true,
        },
        {
          name: "year",
          type: "number",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [
        {
          name: "office",
          type: "text",
          required: false,
        },
        {
          name: "phone",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "socialMedia",
      type: "group",
      fields: [
        {
          name: "linkedIn",
          type: "text",
          required: false,
        },
        {
          name: "googleScholar",
          type: "text",
          required: false,
        },
        {
          name: "researchGate",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "On Leave", value: "on-leave" },
        { label: "Retired", value: "retired" },
      ],
    },
  ],
};

export default Faculty;
