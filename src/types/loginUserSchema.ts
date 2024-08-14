import { z } from "zod";

export const loginUserFormSchema = z.object({
  identifier: z.string(),
  password: z.string(),
  remember: z.boolean().optional()
});
