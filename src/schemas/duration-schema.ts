import { z } from "zod";

export const DurationSchema = z.enum(
    ["6-12 Months", "3-6 Months", "1-3 Months", "1-4 Weeks", "1-7 Days", "self-paced"],
    {
      required_error: "Duration is required.",
    }
  );