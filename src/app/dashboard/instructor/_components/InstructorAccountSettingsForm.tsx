"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { PiUploadSimple } from "react-icons/pi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import SubmitBtn from "@/components/SubmitBtn";
import TextInput from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { instructorAccountSettinSchema } from "@/schemas/instructor-account-setting-schema";
import TextArea from "@/components/TextArea";

type UpdateAccountInfoFormValues = z.infer<
  typeof instructorAccountSettinSchema
>;

const InstructorAccountSettingsForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const form = useForm<z.infer<typeof instructorAccountSettinSchema>>({
    resolver: zodResolver(instructorAccountSettinSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      title: "",
      biography: "",
    },
  });

  const onSubmit = async (data: UpdateAccountInfoFormValues) => {
    console.log({ ...data, userPhoto: image });
  };

  return (
    <Card className="w-full rounded-sm border-none shadow-none">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:flex-grow order-1 space-y-5">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <TextInput
                      className="rounded-none"
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="john"
                    />
                  </div>
                  <div>
                    <TextInput
                      className="rounded-none"
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="doe"
                    />
                  </div>
                </div>
                <TextInput
                  className="rounded-none"
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="john129"
                />
                <TextInput
                  className="rounded-none"
                  control={form.control}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="your phone number..."
                />
                <TextInput
                  control={form.control}
                  name="title"
                  label="Title"
                  placeholder="Your title, profession..."
                  className="rounded-none"
                />

                <TextArea
                  name="biography"
                  label="Biography"
                  placeholder="Your title, profession..."
                  control={form.control}
                />
              </div>

              <div className="md:basis-1/5 order-2 lg:-translate-y-10">
                {/* IMAGE UPLOAD */}
                <div>
                  {/* IMAGE UPLOAD */}
                  <div className=" px-7 py-9 md:p-6 space-y-2.5 h-fit md:flex flex-col items-center justify-center bg-gray-50">
                    <div className=" h-52 md:h-44 md:w-44">
                      <Label
                        htmlFor="img"
                        className="flex-center h-full w-full bg-secondary-50 relative"
                      >
                        {!preview && (
                          <IoCloudUploadOutline className="w-16 h-16 text-secondary-300" />
                        )}
                        <div
                          className={`flex-center absolute bg-secondary-600/10 py-2 w-full bottom-0 left-0 right-0 *:text-secondary-900 ${
                            preview && "!bg-gray-800/50 *:!text-white"
                          }`}
                        >
                          <PiUploadSimple className="h-5 w-5" />
                          <span>Upload Photo</span>
                        </div>
                        <Input
                          type="file"
                          id="img"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        {image && (
                          <Image
                            src={preview!}
                            width={240}
                            height={240}
                            className="object-cover aspect-video h-full"
                            priority
                            alt="user profile photo"
                          />
                        )}
                      </Label>
                    </div>
                    <p className="text-gray-500 text-sm text-center">
                      Image size should be under 1MB and image ratio needs to be
                      1:1
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <SubmitBtn>Save Changes</SubmitBtn>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InstructorAccountSettingsForm;
