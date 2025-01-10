// collections/Students.ts
import { CollectionConfig } from "payload";

const Students: CollectionConfig = {
  slug: "students",
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Disable email verification since it's not required
    maxLoginAttempts: 5,
    lockTime: 600, // 10 minutes
    forgotPassword: {
      expiration: 7200,
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => {
      if (user) {
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "password",
      type: "text",
      required: true,
      admin: {
        hidden: true, // Hide password field in admin UI
      },
    },
    {
      name: "resetPasswordToken",
      type: "text",
      hidden: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "resetPasswordExpiration",
      type: "date",
      hidden: true,
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    // beforeLogin: [
    //   async ({ req, user }) => {
    //     // Any pre-login logic can go here
    //   },
    // ],
    // afterForgotPassword: [
    //   async ({ req, token, user }) => {
    //     // Handle password reset email
    //     // You can integrate your email service here
    //   },
    // ],
  },
  admin: {
    useAsTitle: "email",
    group: "User Management",
    defaultColumns: ["fullName", "email"],
  },
};

export default Students;
