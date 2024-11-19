import { z } from "zod";

export const fileMetadataSchema =  z.object({
    filename: z.string(),
    mimeType: z.string(),
    size: z.number().positive(),
    uploadedAt: z.date().optional(),
  })
  .optional()