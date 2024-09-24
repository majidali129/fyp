"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SubmitBtn from "@/components/SubmitBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const notifications = [
  {
    id: "course-purchase",
    label: "I want to know who buy my course.",
  },
  {
    id: "course-review",
    label: "I want to know who write a review on my course.",
  },
  {
    id: "course-comment",
    label: "I want to know who commented on my course.",
  },
  {
    id: "download-lecture",
    label: "I want to know who download my lecture notes.",
  },
  {
    id: "comment-reply",
    label: "I want to know who replied on my comment.",
  },
  {
    id: "profile-visit",
    label: "I want to know daily how many people visited my profile.",
  },
  {
    id: "download-attach-file",
    label: "I want to know who downlaod my lecture attach file",
  },
];

const FormSchema = z.object({
  notifications: z
    .array(z.string())
    .refine((value) => value.some((notification) => notification), {
      message: "You have to set at least one notification.",
    }),
});
const NotificationsForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      notifications: ["course-comment", "course-purchase"],
    },
  });

  const { errors, isSubmitted } = form.formState;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <Card className="w-full rounded-sm border-none shadow-none">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <ul className="space-y-[18px] ">
              {notifications.map((notification) => (
                <FormField
                  key={notification.id}
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <FormItem
                      key={notification.id}
                      className="flex items-center gap-3 "
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(notification.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  notification.id,
                                ])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== notification.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        className={`${
                          !field.value.includes(notification.id) &&
                          isSubmitted &&
                          errors.notifications
                            ? "text-error-400"
                            : "opacity-70 "
                        }`}
                      >
                        {notification.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </ul>

            {isSubmitted && errors.notifications && (
              <FormMessage className="text-error-400">
                {errors.notifications.message}
              </FormMessage>
            )}

            <SubmitBtn>Save Changes</SubmitBtn>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NotificationsForm;
