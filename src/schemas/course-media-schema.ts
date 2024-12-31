import { z } from "zod";

export const courseMediaSchema = z.object({
  thumbnail: z.any().refine((value) => value === null || value === undefined, {
    message: "Course thumbnail is required",
  }),
  trailer: z.any().refine((value) => value === null || value === undefined, {
    message: "Course trailer is required",
  }),
  courseId: z.string().refine(value => value === '', {
    message: 'Please provide course Id'
  }),
});