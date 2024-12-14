import { z } from "zod";

export const loginUserSchema = z.object({
  username: z.string().min(5, { message: "Username must be 5 or more characters long" }),
  password: z.string().min(8, "Password must be 8 characters long"),
  remember: z.boolean().optional()
});
