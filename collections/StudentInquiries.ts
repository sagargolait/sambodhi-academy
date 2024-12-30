import { CollectionConfig } from 'payload';

const StudentInquiries: CollectionConfig = {
  slug: 'student-inquiries',
  admin: {
    useAsTitle: 'studentName',
  },
  fields: [
    {
      name: 'studentName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        'New',
        'In Progress',
        'Responded',
        'Closed'
      ],
      defaultValue: 'New',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      defaultValue: () => new Date(),
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        return { ...data, submittedAt: new Date() }
      }
    ]
  }
};

export default StudentInquiries;