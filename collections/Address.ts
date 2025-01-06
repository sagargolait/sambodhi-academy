import { CollectionConfig } from "payload";

export const Addresses: CollectionConfig = {
  slug: "addresses",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "street",
  },
  fields: [
    {
      name: "street",
      type: "text",
      required: true,
    },
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "state",
      type: "text",
      required: true,
    },
    {
      name: "country",
      type: "text",
      required: true,
    },
    {
      name: "postalCode",
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "text",
      required: true,
      validate: (value: any) => {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        if (!phoneRegex.test(value)) {
          return "Please enter a valid phone number";
        }
        return true;
      },
    },
    {
      name: "googleMapsUrl",
      type: "text",
      admin: {
        description: "Google Maps location link",
      },
      validate: (value: any) => {
        if (value && !value.includes("google.com/maps")) {
          return "Please enter a valid Google Maps URL";
        }
        return true;
      },
    },
    {
      name: "isPrimary",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
