import SubmitBtn from "@/components/SubmitBtn";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import { updatePasswordSchema } from "@/schemas/passwordSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

function ChangeStudentPasswordForm() {
    const form = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      });


      const onSubmit = async (data: UpdatePasswordFormValues) => {
        console.log(data);
      };


    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              control={form.control}
              name="oldPassword"
              label="Old Password"
              type="password"
              placeholder="********"
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
           <div className="flex justify-end">
           <SubmitBtn >
              Change Password
            </SubmitBtn>
           </div>
          </form>
        </Form>
    )
}



export default ChangeStudentPasswordForm