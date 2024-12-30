"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Phone, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isPrimary: boolean;
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState<Address[]>([])

  const primaryAddress = address.filter((item: any) => item.isPrimary)[0]

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("/api/addresses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAddress(data.docs)
      } catch (error) {
        console.error("There was a problem fetching the addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const onSubmit = async (data: any) => {
    const formData = { studentName: data.studentName, email: data.email, message: data.message, phone: data.phone };

    try {
      const response = await fetch("/api/student-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Form submitted successfully!");

      setStudentName("");
      setEmail("");
      setMessage("");
      setPhone("");
    } catch (error) {
      toast.error(`There was a problem with the form submission. ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <main className="container mx-auto px-4 py-8">
        <SectionHeading>Contact Us</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#10375C]">Send us a Message</CardTitle>
              <CardDescription>
                We&apos;d love to hear from you. Fill out the form below and
                we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="studentName">Name</Label>
                  <Input
                    id="studentName"
                    {...register("studentName", { required: "Name is required" })}
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.studentName.message?.toString()}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message?.toString()}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message?.toString()}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#10375C]">
                Contact Information
              </CardTitle>
              <CardDescription>
                You can reach us through the following channels:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <a href={'tel:0240297990'} className="flex items-center text-sm font-bold">
                  <Phone className="w-5 h-5 mr-1 " />
                  (0240) 297 0990
                </a>
                <a href={'mailto:sambodhipbn@gmail.com'} className="flex items-center text-sm font-bold">
                  <Mail className="w-5 h-5 mr-1" />
                  sambodhiapbn@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#F3C623]" />
                {primaryAddress && <span>{primaryAddress.street}, {primaryAddress.city}, {primaryAddress.state} , {primaryAddress.country}, {primaryAddress?.postalCode} </span>}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-[#10375C]">
                  Our Locations
                </h3>
                <ul className="list-disc list-inside space-y-4">
                  {address.map((item: any) => (
                    <li key={item.id}>{item.city}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
