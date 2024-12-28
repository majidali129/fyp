import { z } from "zod";
import { LevelSchema } from "./course-level-schema";
import { DurationSchema } from "./duration-schema";
import { PricingTypeSchema } from "./pricing-type-schema";
import { CourseFormatSchema } from "./course-format-schema";
import { CourseStatusSchema } from "./course-status-schema";
import { objectIdSchema } from "./mongoId-schema";
import { sectionSchema } from "./section-schema";

export const createCourseSchema = z.object({
    title: z.string().min(5, "Course title must be at least 5 characters long."),
    subTitle: z
      .string()
      .min(5, "Course subtitle must be at least 5 characters long."),
    category: z.string().min(1, "Category is required."),
    subCategory: z.string().optional(),
    courseTopic: z.string().min(1, "Course topic is required."),
    language: z.string().min(1, "Language is required."),
    subtitleLanguage: z.string().optional(),
    courseLevel: LevelSchema,
    courseDuration: DurationSchema,
    pricingType: PricingTypeSchema,
    price: z
      .number()
      .nonnegative("Price cannot be negative.")
      .refine((val) => val === 0 || val > 0, {
        message: "Price must be greater than 0 for paid courses.",
      }),
    oldPrice: z.number().nonnegative("Old price cannot be negative.").optional(),
    discount: z
      .number()
      .min(0, "Discount cannot be less than 0.")
      .max(100, "Discount cannot exceed 100."),

    enrollmentLimit: z.number().nonnegative().optional(),
    courseFormat: CourseFormatSchema,
    status: CourseStatusSchema,
    courseBriefSummary: z
      .string()
      .min(10, "Brief summary must be at least 10 characters."),
    courseDescription: z
      .string()
      .min(20, "Course description must be at least 20 characters."),
      whatYouWillTeach: z
      .array(
        z
          .string()
          .min(5, "Each learning objective must be at least 5 characters.")
      )
      .min(1, "At least one learning objective is required."),
    targetAudience: z
      .array(
        z
          .string()
          .min(5, "Each target audience entry must be at least 5 characters.")
      )
      .min(1, "At least one target audience entry is required."),
    courseRequirements: z
      .array(
        z
          .string()
          .min(5, "Each course requirement must be at least 5 characters.")
      )
      .min(1, "At least one course requirement is required."),
      trailer: z.instanceof(File, { message: "Invalid trailer file" }),
      thumbnail: z.instanceof(File, { message: "Invalid thumbnail file" }),
    sections:sectionSchema,
    welcomeMessage: z
      .string()
      .min(10, "Welcome message must be at least 10 characters."),
    congratulationMessage: z
      .string()
      .min(10, "Congratulation message must be at least 10 characters."),
    courseInstructors: z
      .array(z.string())
      .min(1, "At least one instructor is required."),
    createdBy: z.string(),
    enrolledStudents: z
      .number()
      .int()
      .nonnegative("Enrolled students cannot be negative."),
    reviews: z.array(z.string()).optional(),
    bookMarks: z.array(z.string()).optional(),
  });
