import { z } from "zod";

export const CourseStatusSchema = z.enum(
    ["Draft", "Pending-Approval", "Published", "Archived"],
    {
      required_error: "Course status is required.",
    }
  );