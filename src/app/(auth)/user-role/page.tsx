"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { userRoleSchema } from "@/types/userRoleSchema";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuUserCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";

type UserRoleValue = z.infer<typeof userRoleSchema>;

const roles = [
  {
    value: "INSTRUCTOR",
    label: "Instructor",
    icon: LiaChalkboardTeacherSolid
  },
  {
    value: "STUDENT",
    label: "Student",
    icon: PiStudentFill
  },
  {
    value: "USER",
    label: "Guest",
    icon: LuUserCircle
  },
  {
    value: "ADMIN",
    label: "Admin",
    icon: MdOutlineAdminPanelSettings
  }
];

export default function SelectUserRole() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userRoleSchema>>({
    resolver: zodResolver(userRoleSchema)
  });

  //TODO: resetToken from url to send along with payload

  const userRole = form.watch("role");

  const onSubmit = async (data: UserRoleValue) => {
    localStorage.setItem("userRole", data.role);

    router.push("/sign-up");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] rounded sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg space-y-4 px-7  md:px-10 py-10  shadow-[rgba(100,100,111,0.2)0px_7px_29px_0px]">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Select Your Role</h1>
          <p className="text-muted-foreground">
            Choose your role as teacher, student, or admin.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className=" flex flex-wrap items-center justify-center gap-6"
                    >
                      {roles.map(({ value, icon: Icon, label }) => (
                        <FormItem
                          key={value}
                          className="flex items-center  w-fit   "
                        >
                          <FormLabel
                            className={`font-normal relative cursor-pointer rounded-sm w-[9rem] h-[9rem] shadow-[rgba(100,100,111,0.2)0px_7px_29px_0px] ${
                              userRole === value &&
                              "bg-primary-100 !text-primary-500"
                            } `}
                          >
                            <FormControl className="absolute top-2 right-2">
                              <RadioGroupItem
                                value={value}
                                className="text-primary-500"
                              />
                            </FormControl>
                            <div className="flex-center flex-col gap-2 w-full h-full">
                              <Icon
                                className={`w-11 h-11 opacity-20 ${
                                  userRole === value &&
                                  "text-primary-500 !opacity-100"
                                }`}
                              />
                              <span className="text-[1rem]">{label}</span>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary-500 text-white ">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
