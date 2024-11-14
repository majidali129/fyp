import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: "Firstname must be 3 or more characters long" })
    .max(8, { message: "Firstname must be less or equal 8 characters" }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: "lastname must be 3 or more characters long" })
    .max(8, { message: "lastname must be less or equal 8 characters" }),
  username: z
    .string()
    .trim()
    .min(5, { message: "Username must be 5 or more characters long" })
    .max(14, { message: "Username must be below 14 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 characters long"),
  role: z.enum(["USER", "STUDENT", "INSTRUCTOR", "ADMIN"]).default("USER")
});

// confirmPassword: z.string() // StrongPass1!
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"] // The path of the error in the schema
// });
