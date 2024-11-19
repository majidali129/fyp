import { z } from "zod";

export const courseBasicInfoSchema = z.object({
    title: z.string().min(5, "Course title must be at least 5 characters long."),
    subTitle: z
      .string()
      .min(5, "Course subtitle must be at least 5 characters long."),
    category: z.string().min(1, "Category is required."),
    subCategory: z.string().min(1, "Subcategory is required."),
    topic: z.string().min(1, "Course topic is required."),
    language: z.string().min(1, "Language is required."),
    subtitleLanguage: z.string().optional(),
    level: z.string().min(1, "Course level is required."),
    duration: z.string().min(1, "Duration is required."),
    pricingType: z.string().min(1, "Pricing type is required."),
    price: z.number().min(0, "Price cannot be less than 0."),
    discount: z.number().min(0, "Discount cannot be less than 0."),
    enrollmentLimit: z.number().min(1, "Enrollment limit cannot be less than 1."),
    format: z.string().min(1, "Course format is required."),
  });