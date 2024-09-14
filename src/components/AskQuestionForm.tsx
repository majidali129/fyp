'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitBtn from "./SubmitBtn";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import TextInput from "./TextInput";
import { Textarea } from "./ui/textarea";

const askQuestionSchema = z.object({
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters long" }),
  message: z.string().min(1, { message: "please write a proper message" }),
});

type AskQuestionFormValues = z.infer<typeof askQuestionSchema>;

const AskQuestionForm = () => {
  const form = useForm<z.infer<typeof askQuestionSchema>>({
    resolver: zodResolver(askQuestionSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });
  const onSubmit = async (data: AskQuestionFormValues) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3.5 md:space-y-2.5 2xl:space-y-5"
      >
        <TextInput control={form.control} name="subject" placeholder="Majid" className="ring-0 focus:bg-white border-none" />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself "
                  className="resize-none border-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center py-1.5 justify-end flex-wrap gap-1">
          <SubmitBtn>Submit Question</SubmitBtn>
        </div>
      </form>
    </Form>
  );
};

export default AskQuestionForm;
