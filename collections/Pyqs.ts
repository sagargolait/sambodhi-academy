import { CollectionConfig } from "payload";

const QuestionPapers: CollectionConfig = {
  slug: "question-papers",
  access: {
    read: () => true,
  },
  labels: {
    singular: "Question Paper",
    plural: "Question Papers",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "subject",
      type: "text",
      required: true,
      label: "Subject",
    },
    {
      name: "year",
      type: "number",
      required: true,
      label: "Year",
    },
    {
      name: "PaperPdf",
      type: "upload",
      relationTo: "media", // Assuming you have a media collection for file uploads
      required: true,
      label: "File",
    },
  ],
};

export default QuestionPapers;
