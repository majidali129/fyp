import { z } from "zod";

export const loginUserSchema = z.object({
  identifier: z.string(),
  password: z.string(),
  remember: z.boolean().optional()
});
