import { z } from "zod";

export const userRoleSchema = z.object({
  role: z.enum(["USER", "INSTRUCTOR", "STUDENT", "ADMIN"], {
    required_error: "You need to select one of the above roles!"
  })
});
