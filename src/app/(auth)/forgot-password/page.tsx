"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TextInput from "@/components/TextInput";
import { forgotPasswordSchema } from "@/schemas/passwordSchemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword } from "@/services/api/user.service";
import { useRouter } from "next/navigation";

type ResetPasswordValue = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const roter = useRouter();
  const {mutate: forgot, isPending} = useMutation({
    mutationFn: (data: ResetPasswordValue) => forgotPassword(data),
    onSuccess: (data) => {
      console.log('password forgot successfully', data);
      toast.success('Please check your email to reset password');
    },
    onError: (error) => {
      console.log('Forgot password Error',error);
      toast.error('Forgot password Error')
    }
  })
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });
  //TODO: username from url to send along with payload

  const onSubmit = async (data: ResetPasswordValue) => {
    console.log(data);
    forgot(data)
  };
  return (
    <div className="flex h-full flex-col items-center justify-center min-h-[calc(100vh-64px)] rounded  px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md  space-y-8 px-7  md:px-10 py-10 md:py-14 shadow-[rgba(100,100,111,0.2)0px_7px_29px_0px]">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              control={form.control}
              name="email"
              label="Email  Address"
              type="email"
              required
              placeholder="majid@gmail.com"
            />
            <Button disabled={isPending} type="submit" className="w-full bg-primary-500 text-white">
              {isPending? 'Wait...': 'Forgot'}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
