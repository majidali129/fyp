import SubmitBtn from "@/components/SubmitBtn";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import { updateStudentInfoSchema } from "@/schemas/updateInfoSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UpdateUserInfoFormValues = z.infer<typeof updateStudentInfoSchema>;

const UpdateUserInfoForm = ({userPhoto}: {userPhoto:any}) => {
    const form = useForm<z.infer<typeof updateStudentInfoSchema>>({
        resolver: zodResolver(updateStudentInfoSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          title: "",
        },
      });



      const onSubmit = async (data: UpdateUserInfoFormValues) => {
        console.log({...data, userPhoto: userPhoto});
      };
  return (
    <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 md:space-y-5 2xl:space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-4">
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
                  label="Email"
                  placeholder="majid@gmail.com"
                />

                <TextInput
                  control={form.control}
                  name="title"
                  label="Title"
                  placeholder="your title, profession or small hobby..."
                />

                <div className="flex items-center justify-end flex-wrap gap-1">
                  <SubmitBtn>Save Changes</SubmitBtn>
                </div>
              </form>
            </Form>
  )
}

export default UpdateUserInfoForm