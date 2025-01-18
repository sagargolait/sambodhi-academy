import { CollectionConfig, CollectionSlug } from "payload";

const Faculty: CollectionConfig = {
  slug: "faculty",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "department", "designation"],
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
      name: "profileImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "department",
      type: "text",
      required: true,
    },
    {
      name: "Years of Experience",
      type: "number",
      required: true,
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
    {
      name: "order",
      type: "number",
      admin: {
        position: "sidebar", // Display in the sidebar for easier access in the admin panel
        description:
          "Controls the display order of Faculty. Lower numbers appear first.",
      },
      hooks: {
        beforeChange: [
          async ({ req, operation, value }) => {
            if (operation === "create") {
              const payload = req.payload;
              // Find the highest order value in existing documents
              const existingFaculties: any = await payload.find({
                collection: "faculty" as CollectionSlug,
                sort: "-order",
                limit: 1,
              });

              // If there are existing faculty, set the order to highest + 1
              // If no faculties exist, start with 1
              const nextOrder =
                existingFaculties.docs.length > 0
                  ? existingFaculties.docs[0]?.order + 1
                  : 1;

              return nextOrder;
            }
            return value;
          },
        ],
      },
    },
  ],
};

export default Faculty;
