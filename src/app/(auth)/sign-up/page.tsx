"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import illustration from "../../../../public/images/signup.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { registerUserSchema } from "@/schemas/registerUserSchema";
import SubmitBtn from "@/components/SubmitBtn";

type RegisterUserFormValues = z.infer<typeof registerUserSchema>;

export default function SignUpForm() {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
      // confirmPassword: ""
    }
  });

  const onSubmit = async (data: RegisterUserFormValues) => {
    console.log({ ...data, file });
    console.log(file);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] *:h-[calc(100vh-64px)] ">
      <Image
        src={illustration}
        alt="signup image"
        className="object-cover hidden lg:block"
        priority
      />

      <div className="flex items-center justify-center p-6 md:p-10 ">
        <div className="max-w-md  w-full space-y-6 ">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create your account</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3.5 md:space-y-2.5 2xl:space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Majid"
                />
                <TextInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Ali"
                />
              </div>
              <TextInput
                control={form.control}
                name="username"
                label="Username"
                placeholder="majid129"
              />

              <TextInput
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="majid@gmail.com"
              />
              <TextInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                type="password"
              />

              {/* <TextInput
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="********"
                type="password"
              /> */}

              <div>
                <Label
                  htmlFor="profilePhoto"
                  className={`py-3 rounded-sm flex justify-center ${
                    file
                      ? "bg-gray-100"
                      : "bg-gray-50 text-primary-500 font-semibold"
                  } `}
                >
                  {file ? file.name : "Profile Photo"}
                </Label>
                <Input
                  id="profilePhoto"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  className="hidden"
                  type="file"
                />
              </div>

              <div className="flex items-center justify-end flex-wrap gap-1">
                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms">
                    I agree to the{" "}
                    <Link href="#" className="underline" prefetch={false}>
                      Terms and Conditions
                    </Link>
                  </Label>
                </div> */}
                <SubmitBtn>Submit</SubmitBtn>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
