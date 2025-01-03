import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().min(5, { message: "Email is required" }),
  password: z.string().min(8, "Password must be 8 characters long"),
  // remember: z.boolean().optional()
});
