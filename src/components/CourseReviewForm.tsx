'use client'
import { FaStar } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button";

  const ReviewSchema = z.object({
    message: z
      .string({required_error: 'please enter a feedback message'})
      .min(10, {
        message: "review must be at least 10 characters.",
      })
      .max(160, {
        message: "review must not be longer than 30 characters.",
      }),
  })

const CourseReviewForm = ({onCancel}: {onCancel: () => void}) => {
    const form = useForm<z.infer<typeof ReviewSchema>>({
        resolver: zodResolver(ReviewSchema),
      })

      function onSubmit(data: z.infer<typeof ReviewSchema>) {
        console.log(data.message)
      }
  return (
    <div>
      <div className="flex-center flex-col">
        <p className="text-lg text-gray-900">
          4.5 <span className="text-gray-500 text-[.8rem]">(Good/Amazing)</span>
        </p>
        <div className="flex-between !gap-x-1.5">
            <FaStar className="md:h-6 md:w-6 h-4 w-5 text-warning-500" />
            <FaStar className="md:h-6 md:w-6 h-4 w-5 text-warning-500" />
            <FaStar className="md:h-6 md:w-6 h-4 w-5 text-warning-500" />
            <FaStar className="md:h-6 md:w-6 h-4 w-5 text-warning-500" />
            <FaStar className="md:h-6 md:w-6 h-4 w-5 text-warning-500" />
        </div>
      </div>
      <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none "
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-error-500" />
            </FormItem>
          )}
        />
        <div className="flex-between">
        <Button type="button" variant={'transparentGhost'} onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit Review</Button>
        </div>
      </form>
    </Form>
      </div>
      <div></div>
    </div>
  );
};

export default CourseReviewForm;
