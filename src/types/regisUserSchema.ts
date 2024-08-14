import { z } from "zod";

export const registerUserFormSchema = z
  .object({
    firstName: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    lastName: z
      .string()
      .max(3, { message: "Must be 3 or more characters long" }),
    username: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(14, { message: "Must be below 14 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    confirmPassword: z.string() // StrongPass1!
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] // The path of the error in the schema
  });
