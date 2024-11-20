import { z } from "zod";

export const lectureUpdateSchema = z.object({
  isNewVideo: z.boolean().default(false),
    publicId: z.string().min(1, "Public ID is required").optional(),
    title: z
      .string()
      .min(10, "Lecture title must be at least 10 characters long.").optional(),
    caption: z.string().optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.").optional(),
    order: z.number().positive().optional(),
    tags: z.array(z.string()).optional(),
    video: z.any().optional(),
  });