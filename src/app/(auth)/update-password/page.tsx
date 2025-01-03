"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TextInput from "@/components/TextInput";
import { useRouter, useSearchParams } from "next/navigation";
import { updatePasswordSchema } from "@/schemas/passwordSchemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword } from "@/services/api/user.service";

type updatePasswordValues = z.infer<typeof updatePasswordSchema>;

export default function UpdatePasswordForm() {
  const router = useRouter();
  const { mutate: update, isPending } = useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      updatePassword(data),
    onSuccess: (data) => {
      console.log("Password updated successfully", data);
      toast.success("Password updated successfully. Login to proceed");
    },
    onError: (error) => {
      console.log("Change password Error", error);
      toast.error("Change password Error");
    },
  });
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  //TODO: resetToken from url to send along with payload

  const onSubmit = async (data: updatePasswordValues) => {
    update(data, { onSuccess: () => router.push("/sign-in") });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] rounded sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8 px-7  md:px-10 py-10 md:py-14 shadow-[rgba(100,100,111,0.2)0px_7px_29px_0px]">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Change Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              control={form.control}
              name="oldPassword"
              label="Old Password"
              type="password"
              required
              placeholder="********"
            />
            <TextInput
              control={form.control}
              name="newPassword"
              label="New Password"
              type="password"
              required
              placeholder="********"
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Wait..." : "Update"}
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
