import { z } from "zod";

export const updateStudentInfoSchema = z.object({
    firstName: z
      .string({
        invalid_type_error: "First name must be a string",
      }).min(3, {
          message: "First name must be at least 3 characters long",
        })
        .max(15, {
          message: "First name cannot be longer than 15 characters",
        })
      ,
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(3, { message: "Last name must be at least 3 characters" })
      .max(10, { message: "Last name must be at most 10 characters" }),
    username: z
      .string({ required_error: "Username is required" })
      .min(4, { message: "Username must be at least 4 characters" })
      .max(18, { message: "Username must be at most 18 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address"),
    title: z
      .string({ required_error: "Please provide title for your profile" })
      .min(1, {message: 'Please add some title to your profile'})
      .max(150, { message: "Title must be at most 150 characters" })
      .optional(),
  });

