import { CollectionConfig } from 'payload';

export const GovernmentSchemes: CollectionConfig = {
  slug: 'government-schemes', // The slug for the collection (URL path)
  admin: {
    useAsTitle: 'schemeName', // Field to display in the admin UI list
    defaultColumns: ['schemeName', 'status', 'createdAt'], // Columns to display in the admin UI
  },
  fields: [
    {
      name: 'schemeName',
      type: 'text',
      required: true, // Scheme name is required
      label: 'Scheme Name',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      admin: {
        rows: 5, // A large text area for a description
      },
    },
    {
      name: 'schemeFile', // Field for uploading PDF
      type: 'upload',
      relationTo: 'media', // Media relation (ensure you have a media collection set up)
      required: true, // PDF upload is required
      label: 'Upload Scheme PDF',
      admin: {
        // Define any specific properties here if needed
        description: 'Upload the official PDF for the government scheme.',
      },
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'Date of Publication',
      required: true,
      admin: {
        position: 'sidebar', // Place this field in the sidebar
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
      defaultValue: 'draft', // Default to 'draft' status
      label: 'Status',
      admin: {
        position: 'sidebar', // Place this field in the sidebar
      },
    },
  ],
  timestamps: true, // Auto-manage createdAt and updatedAt timestamps
};

