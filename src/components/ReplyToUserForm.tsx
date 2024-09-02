"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "./TextInput";
import { FaRegComments } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const userReplySchema = z.object({
  message: z.string({ required_error: "plaase make sure to add some commnet" })
});
type UserReplyValue = z.infer<typeof userReplySchema>;

const ReplyToUserForm = () => {
  const [isUserReplying, setIsUserReplying] = useState<boolean>(false);
  const form = useForm<z.infer<typeof userReplySchema>>({
    resolver: zodResolver(userReplySchema),
    defaultValues: {
      message: ""
    }
  });

  const onSubmit = async (data: UserReplyValue) => {
    console.log(data);
  };
  return (
    <div className="space-y-1.5">
      <div className="flex-start ">
        <FaRegComments
          className={`w-5 h-5 ${
            isUserReplying ? "!text-primary-500" : "text-gray-500"
          }`}
        />
        <span
          onClick={() => setIsUserReplying(!isUserReplying)}
          className={`cursor-pointer ${
            isUserReplying ? "!text-primary-500" : "text-gray-500"
          }`}
        >
          REPLY
        </span>
      </div>
      {isUserReplying && (
        <Form {...form}>
          <form action="#" onSubmit={form.handleSubmit(onSubmit)} className="flex-between w-full !gap-x-2 ">
            <div className="flex items-center w-full border ps-3">
              <FaRegComments className="w-5 h-5 text-gray-500" />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormControl>
                      <Input
                        placeholder="write your replys"
                        className="ring-0  py-[7px] w-full focus:bg-white  hover:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size={"sm"}>
              Post Reply
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ReplyToUserForm;
