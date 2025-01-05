import { CollectionConfig } from "payload";

const JobApplications: CollectionConfig = {
  slug: "job-applications",
  labels: {
    singular: "Job Application",
    plural: "Job Applications",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
    },
    {
      name: "resume",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Resume",
    },
    {
      name: "coverLetter",
      type: "textarea",
      label: "Cover Letter",
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        return { ...data, submittedAt: new Date() };
      },
    ],
  },
};

export default JobApplications;
