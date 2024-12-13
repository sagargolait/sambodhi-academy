"use client";

import { useState } from "react";
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

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-12 text-[#10375C] relative pb-4">
    {children}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F3C623]"></span>
  </h2>
);

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

export default function CareersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend

    // Reset form
    setName("");
    setEmail("");
    setResume(null);
    setCoverLetter("");
  };

  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>Join Our Team</SectionHeading>

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
                  <Button className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    onChange={(e) => setResume(e.target.files?.[0] || resume)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                  />
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
