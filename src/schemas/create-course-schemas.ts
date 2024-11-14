import { z } from "zod";
import { isMongoId } from "validator";

const objectIdSchema = z.string().refine(isMongoId);

const PricingTypeSchema = z.enum(["Free", "Paid"], {
  required_error: "Pricing type is required.",
});

const DurationSchema = z.enum(
  ["6-12 Months", "3-6 Months", "1-3 Months", "1-4 Weeks", "1-7 Days"],
  {
    required_error: "Duration is required.",
  }
);

const CourseFormatSchema = z.enum(["self-paced", "live"], {
  required_error: "Course format is required.",
});
const CourseStatusSchema = z.enum(
  ["Draft", "Pending-Approval", "Published", "Archived"],
  {
    required_error: "Course status is required.",
  }
);

const LevelSchema = z.enum(
  ["Beginner", "Intermediate", "Advanced", "Expert", "All Levels"],
  {
    required_error: "Course level is required.",
  }
);

const S3FileSchema = z.object({
  url: z.string().trim().url("Invalid URL format for file URL."),
  filename: z.string().min(1, "Filename is required."),
  mimeType: z.string().min(1, "MIME type is required."),
  size: z.number().positive("File size must be a positive number."),
  uploadedAt: z.date({ required_error: "Upload date is required." }),
});

export const LectureSchema = z.object({
  title: z
    .string()
    .min(10, "Lecture title must be at least 10 characters long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long."),
  duration: z.string().min(1, "Duration is required."),
  isCompleted: z.boolean().default(false),
  videoUrl: z.string().url("Invalid URL format for video URL."),
  lectureMetada: S3FileSchema,
  attachments: z.array(S3FileSchema).optional(),
  notes: z.array(S3FileSchema).optional(),
  quizzes: z.array(objectIdSchema).optional(),
  comments: z.array(objectIdSchema).optional(),
  order: z.number().nonnegative("Order must be a non-negative number."),
});

export const SectionSchema = z.object({
  sectionTitle: z.string().min(1, "Section title is required."),
  lectures: z.array(objectIdSchema).or(z.array(LectureSchema)),
  order: z.number().nonnegative("Order must be a non-negative number."),
});

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

  enrollmentLimit: z.number().int().positive().optional(),
  courseFormat: CourseFormatSchema,
  status: CourseStatusSchema,
  courseBriefSummary: z
    .string()
    .min(10, "Brief summary must be at least 10 characters."),
  courseDescription: z
    .string()
    .min(20, "Course description must be at least 20 characters."),
  whatYouWillLearn: z
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
  thumbnail: z.string().trim().url("Invalid URL format for thumbnail."),
  trailerUrl: z.string().trim().url("Invalid URL format for trailer."),
  sections: z.array(LectureSchema).min(1, "At least one section is required."),
  welcomeMessage: z
    .string()
    .min(10, "Welcome message must be at least 10 characters."),
  congratulationMessage: z
    .string()
    .min(10, "Congratulation message must be at least 10 characters."),
  courseInstructors: z
    .array(objectIdSchema)
    .min(1, "At least one instructor is required."),
  createdBy: objectIdSchema,
  enrolledStudents: z
    .number()
    .int()
    .nonnegative("Enrolled students cannot be negative."),
  ratings: z
    .number()
    .min(0, "Rating cannot be less than 0.")
    .max(5, "Rating cannot exceed 5."),
  reviews: z.array(objectIdSchema).optional(),
  bookMarks: z.array(objectIdSchema).optional(),
});
