import { z } from "zod";


  export const userGuideSchema = z.object({
    value: z.string().min(5, "User guide value must be at least 5 characters long."),
    placeholder: z.string().optional(),
  });