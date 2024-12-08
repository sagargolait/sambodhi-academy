"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "./ui/toast";
import SectionHeading from "./SectionHeading";

const RequestCounseling: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [counselingType, setCounselingType] = useState("call");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ name, email, phone, counselingType });
    toast({
      title: "Counseling Request Submitted",
      description: "We'll get back to you soon!",
    });
  };

  return (
    <section className="py-10 bg-[#F4F6FF]">
      <div className="container mx-auto px-4">
        <SectionHeading>Request Counseling & How to Enroll</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#10375C]">
                Fill in your details
              </CardTitle>
              <CardDescription className="text-[#EB8317]">
                We&apos;ll get back to you for counseling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#10375C]">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-[#10375C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#10375C]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-[#10375C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#10375C]">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-[#10375C]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#10375C]">Counseling Type</Label>
                  <RadioGroup
                    value={counselingType}
                    onValueChange={setCounselingType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="call" id="call" />
                      <Label htmlFor="call" className="text-[#10375C]">
                        Call
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="text-[#10375C]">
                        Video
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#10375C]">How to Enroll</CardTitle>
              <CardDescription className="text-[#EB8317]">
                Follow these steps to join our programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-4 text-[#10375C]">
                <li>
                  <span className="font-semibold">Request Counseling:</span>{" "}
                  Fill out the form on the left to schedule a counseling
                  session.
                </li>
                <li>
                  <span className="font-semibold">Attend Counseling:</span>{" "}
                  Discuss your goals and get personalized course
                  recommendations.
                </li>
                <li>
                  <span className="font-semibold">Choose Your Program:</span>{" "}
                  Select the course that best fits your needs and aspirations.
                </li>
                <li>
                  <span className="font-semibold">Complete Registration:</span>{" "}
                  Fill out the enrollment form and submit necessary documents.
                </li>
                <li>
                  <span className="font-semibold">Pay Tuition:</span> Complete
                  the payment process to secure your spot.
                </li>
                <li>
                  <span className="font-semibold">Orientation:</span> Attend the
                  orientation session to get started with your program.
                </li>
              </ol>
              <div className="mt-6">
                <Button className="w-full bg-[#10375C] text-[#F4F6FF] hover:bg-[#EB8317]">
                  View Detailed Enrollment Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RequestCounseling;
