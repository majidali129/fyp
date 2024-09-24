"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import illustration from "../../../../public/images/signin.png";
import Socials from "@/components/Socials";
import TextInput from "@/components/TextInput";
import { loginUserSchema } from "@/schemas/loginUserSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
type LoginUserFormValues = z.infer<typeof loginUserSchema>;

export default function SignInForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      identifier: "",
      password: "",
      remember: false
    }
  });

  const onSubmit = async (data: LoginUserFormValues) => {
    console.log({ email: data.identifier, password: data.password });

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      });

      if (res?.url) {
        router.replace("/");
      }

      if (res?.error) throw res.error;
    } catch (error: any) {
      console.log("above error", error);
      if (error === "CredentialsSignin") {
        setError("Invalid credentials");
        console.log("Invalid credentials");
      }
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr]  *:h-[calc(100vh-64px)]">
      <Image
        src={illustration}
        alt="signup image"
        className="object-cover hidden lg:block"
        priority
      />

      <div className="flex flex-col space-y-3 lg:space-y-5 *:max-w-[26rem] items-center justify-center p-6 md:p-10">
        <div className="  w-full space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground opacity-80">
              Enter your credentials to access your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <TextInput
                control={form.control}
                name="identifier"
                label="User / Email"
                type="text"
                placeholder="majid@gmail.com"
              />
              <TextInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                type="password"
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remember Me</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="text-sm">
                  <Link
                    href={`/forgot-password`}
                    className="font-medium text-blue-500 hover:text-blue-600 hover:underline"
                    prefetch={false}
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className=" bg-primary-500 text-white px-10 w-full"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex opacity-70 items-center justify-between w-full">
          <span className="block bg-gray-300 h-[1px] w-1/3"></span>
          <p className="tracking-wide">SIGN IN WITH</p>
          <span className="block bg-gray-300 h-[1px] w-1/3"></span>
        </div>

        <Socials />
      </div>
    </div>
  );
}
