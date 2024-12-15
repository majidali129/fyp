import { z } from "zod";

export const courseReviewSchema = z
  .object({
    review: z
      .string()
      .min(1, "Review text must be 8 characters long")
      .max(200, "Review text can not be more than 200 characters"),
    rating: z
      .number()
      .min(1, "Rating can't be less than 1")
      .max(5, "Rating can't be more than 5").transform((val) => Number(val)),
  })

