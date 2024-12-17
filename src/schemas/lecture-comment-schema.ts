import { isMongoId } from "validator";
import z from "zod";

export const lectureCommentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment text must be 8 characters long")
    .max(200, "Comment text can not be more than 200 characters"),
});

export const updateCommentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment text must be 8 characters long")
    .max(200, "Comment text can not be more than 200 characters"),
});
