import { CollectionConfig, CollectionSlug } from "payload";

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
    {
      name: "order",
      type: "number",
      required: true,
      admin: {
        position: "sidebar", // Display in the sidebar for easier access in the admin panel
        description:
          "Controls the display order of Addresses. Lower numbers appear first.",
      },
      hooks: {
        beforeChange: [
          async ({ req, operation, value }) => {
            if (operation === "create") {
              const payload = req.payload;
              // Find the highest order value in existing documents
              const existingAddresses: any = await payload.find({
                collection: "addresses" as CollectionSlug,
                sort: "-order",
                limit: 1,
              });

              // If there are existing addresses, set the order to highest + 1
              // If no addresses exist, start with 1
              const nextOrder =
                existingAddresses.docs.length > 0
                  ? existingAddresses.docs[0]?.order + 1
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
