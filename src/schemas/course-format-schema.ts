import { z } from "zod";

export const CourseFormatSchema = z.enum(["self-paced", "live"], {
    required_error: "Course format is required.",
  });