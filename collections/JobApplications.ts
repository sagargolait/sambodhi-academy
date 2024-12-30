import { CollectionConfig, CollectionSlug } from 'payload';

const JobApplications: CollectionConfig = {
 slug: 'job-applications',
 admin: {
   useAsTitle: 'applicantName',
   defaultColumns: ['applicantName', 'email', 'appliedPosition', 'applicationDate'],
 },
 access: {
   read: () => true,
 },
 fields: [
   {
     name: 'applicantName',
     type: 'text',
     required: true,
   },
   {
     name: 'email',
     type: 'email',
     required: true,
     unique: true,
   },
   {
     name: 'phone',
     type: 'text',
     required: true,
   },
   {
     name: 'appliedPosition',
     type: 'relationship',
     relationTo: 'career-openings' as CollectionSlug,
     required: true,
   },
   {
     name: 'resume',
     type: 'upload',
     relationTo: 'media',
     required: true,
     filterOptions: {
       mimeType: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
     },
   },
   {
     name: 'coverLetter',
     type: 'richText',
     required: true,
   },
   {
     name: 'applicationDate',
     type: 'date',
     required: true,
     defaultValue: new Date(),
   }
 ],
};

export default JobApplications;