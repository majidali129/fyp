import { z } from "zod";
import { lectureSchema } from "./lecture-schema";

export const sectionSchema = z.array(z.object({
  publicId: z.string().min(1, "publicId is required for section"),
  title: z.string().min(1, "Section title is required."),
  order: z.number().nonnegative("Order must be a non-negative number."),
  lectures: z.array(lectureSchema)
}));
