import { z } from "zod";

export const courseBasicInfoSchema = z.object({
    title: z
      .string()
      .trim()
      .min(10, { message: "Course title needs to be minimum 10 letters" })
      .max(80, { message: "Course title can not be more than 80 characters." }),
    subTitle: z
      .string()
      .trim()
      .min(10, { message: "Subtitle needs to be minimum 10 letters" })
      .max(120, { message: "Subtitle can not be more than 80 characters." }),
    category: z.string().min(2, "please select a category"),
    subCategory: z.string().min(2, "please select a sub-category"),
    topic: z.string().trim().min(1, "please add a topic for course."),
    'course-language': z.string().min(1, 'Please add course language'),
    'subtitle-language': z.string().optional(),
    level: z.string().min(1, 'Please choose a level for course'),
    duration: z.string().min(1, 'Course duration is required'),
  });