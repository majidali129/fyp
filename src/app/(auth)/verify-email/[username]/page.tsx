"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

const VerifyFormSchema = z.object({
  code: z
    .string()
    .min(5, { message: "Your one-time password must be 6 characters." })
});

export default function VerifyOtpPage() {
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof VerifyFormSchema>>({
    resolver: zodResolver(VerifyFormSchema),
    defaultValues: {
      code: ""
    }
  });

  //TODO: username from url to send along with payload

  const onSubmit = (data: z.infer<typeof VerifyFormSchema>) => {
    console.log(data);
  };
  console.log(params.username);

  return (
    <div className="flex h-full flex-col items-center justify-center min-h-[calc(100vh-64px)] rounded  px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8 flex items-center justify-center flex-col shadow-[rgba(100,100,111,0.2)0px_7px_29px_0px] px-10 py-14">
        <div>
          <h2 className="text-center text-4xl font-bold tracking-tight text-foreground">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Enter the 6-digit code sent to your email to verify your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" mb-2.5 block !text-center">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Verify Email
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <Link
            href="#"
            className="font-medium text-sky-500 hover:text-primary-foreground"
            prefetch={false}
          >
            Resend Code
          </Link>
        </div>
      </div>
    </div>
  );
}
