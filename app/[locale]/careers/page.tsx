"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Briefcase, GraduationCap, Users, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { toast } from 'sonner'

const jobOpenings = [
  {
    title: "Senior UPSC Faculty",
    department: "Academic",
    location: "New Delhi",
  },
  { title: "SSC Exam Specialist", department: "Academic", location: "Mumbai" },
  {
    title: "Student Counselor",
    department: "Student Services",
    location: "Bangalore",
  },
  { title: "Content Developer", department: "Curriculum", location: "Chennai" },
  {
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Kolkata",
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  resume: yup
    .mixed<FileList>()
    .required("Resume is required")
    .test("fileSize", "File too large", (value) => {
      return value && value.length > 0 && value[0].size <= 2000000; // 2MB
    }),
  coverLetter: yup.string().required("Cover letter is required"),
});

interface IFormInputs {
  name: string;
  email: string;
  resume: FileList;
  coverLetter: string;
}

export default function CareersPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      // First, upload the resume file
      const resumeFormData = new FormData();
      const fileName = `${data.name}'s Resume - ${data.resume[0].name}`;

      resumeFormData.append('file', data.resume[0]);
      resumeFormData.append('fileName', fileName);

      const uploadResponse = await fetch('/api/media', {
        method: 'POST',
        body: resumeFormData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.errors?.[0]?.message || 'Failed to upload resume');
      }

      const uploadedFile = await uploadResponse.json();

      // Then, create the job application with the file reference
      const applicationData = {
        name: data.name,
        email: data.email,
        resume: uploadedFile.doc.id,
        coverLetter: data.coverLetter,
      };

      const applicationResponse = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!applicationResponse.ok) {
        const errorData = await applicationResponse.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred while submitting your application.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>JoinOurTeam</SectionHeading>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-[#10375C]">
            Why Work With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#10375C]">
                  <Briefcase className="mr-2" />
                  Career Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Opportunities for professional development and advancement
                  within the organization.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#10375C]">
                  <GraduationCap className="mr-2" />
                  Continuous Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Access to resources and workshops to enhance your skills and
                  knowledge.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#10375C]">
                  <Users className="mr-2" />
                  Collaborative Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Work with a team of passionate educators and professionals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#10375C]">
                  <CheckCircle className="mr-2" />
                  Make an Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Help shape the future of education and empower students to
                  achieve their goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-[#10375C]">
            Current Openings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-[#10375C]">{job.title}</CardTitle>
                  <CardDescription>
                    {job.department} | {job.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                    onClick={scrollToForm}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div ref={formRef}>
          <h3 className="text-2xl font-semibold mb-6 text-[#10375C]">
            General Application
          </h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#10375C]">
                Submit Your Application
              </CardTitle>
              <CardDescription>
                Don&apos;t see a position that fits? Send us your general
                application, and we&apos;ll keep you in mind for future
                opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    {...register("resume")}
                    className={errors.resume ? "border-red-500" : ""}
                  />
                  {errors.resume && (
                    <p className="text-red-500 text-sm">{errors.resume.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    {...register("coverLetter")}
                    className={errors.coverLetter ? "border-red-500" : ""}
                  />
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}