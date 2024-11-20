import { z } from "zod";
import { fileMetadataSchema } from "./file-metadata-scehma";

export const lectureSchema = z.object({
  publicId: z.string().min(1, "Public ID is required"),
  title: z
    .string()
    .min(10, "Lecture title must be at least 10 characters long."),
  caption: z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long."),
  order: z.number().positive(),
  tags: z.array(z.string()).optional(),
  video: z.any(),
});

