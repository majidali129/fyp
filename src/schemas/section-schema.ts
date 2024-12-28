import { z } from "zod";
import { lectureSchema } from "./lecture-schema";
import { objectIdSchema } from "./mongoId-schema";

export const sectionSchema = z.object({
  courseId: z.string().min(1, "Course id is required."), // to identify course
  publicId: z.string().min(1, "Section id is required."),
  title: z.string().min(1, "Section title is required."),
  order: z.number().nonnegative("Order must be a non-negative number."),
  lectures: z.array(lectureSchema),
}).optional();
