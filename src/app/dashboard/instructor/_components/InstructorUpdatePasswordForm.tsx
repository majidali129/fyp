"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SubmitBtn from "@/components/SubmitBtn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/schemas/passwordSchemas";
import TextInput from "@/components/TextInput";

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export default function InstructorUpdatePasswordForm() {
  const form = useForm<z.infer<typeof updatePasswordSchema>>(
      {
        resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
  });

  const onSubmit = (data: UpdatePasswordFormValues) => {
    console.log(data);
  }

  return (
    <Card className="w-full rounded-sm border-none shadow-none">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              control={form.control}
              name="oldPassword"
              label="Old Password"
              type="password"
              placeholder="********"
              className="ring-0 focus:bg-transparent"
            />
            <TextInput
              control={form.control}
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="********"
            />
            <TextInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="********"
            />
           <div >
           <SubmitBtn >
              Change Password
            </SubmitBtn>
           </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
