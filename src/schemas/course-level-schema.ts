import { z } from "zod";

export const LevelSchema = z.enum(
    ["Beginner", "Intermediate", "Advanced", "Expert", "All Levels"],
    {
      required_error: "Course level is required.",
    }
  );