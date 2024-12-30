import { CollectionConfig } from 'payload';

const CareerOpenings: CollectionConfig = {
 slug: 'career-openings',
 admin: {
   useAsTitle: 'jobTitle',
   defaultColumns: ['jobTitle', 'department', 'status', 'applicationDeadline'],
 },
 access: {
   read: () => true,
 },
 fields: [
   {
     name: 'jobTitle',
     type: 'text',
     required: true,
   },
   {
     name: 'department',
     type: 'select',
     options: [
       {
         label: 'Teaching',
         value: 'teaching',
       },
       {
         label: 'Administration', 
         value: 'administration',
       },
       {
         label: 'Support Staff',
         value: 'support',
       }
     ],
     required: true,
   },
   {
     name: 'position',
     type: 'richText',
     required: true,
   },
   {
     name: 'qualifications',
     type: 'array',
     required: true,
     fields: [
       {
         name: 'qualification',
         type: 'text'
       }
     ]
   },
   {
     name: 'responsibilities',
     type: 'array',
     required: true,
     fields: [
       {
         name: 'responsibility',
         type: 'text'
       }
     ]
   },
   {
     name: 'experience',
     type: 'text',
     required: true,
   },
   {
     name: 'salary',
     type: 'text',
     required: false,
   },
   {
     name: 'location',
     type: 'text',
     required: true,
   },
   {
     name: 'applicationDeadline',
     type: 'date',
     required: true,
   },
   {
     name: 'status',
     type: 'select',
     options: [
       {
         label: 'Open',
         value: 'open',
       },
       {
         label: 'Closed',
         value: 'closed',
       },
       {
         label: 'Under Review',
         value: 'under-review',
       }
     ],
     required: true,
     defaultValue: 'open',
   },
   {
     name: 'howToApply',
     type: 'richText',
     required: true,
   }
 ],
};

export default CareerOpenings;