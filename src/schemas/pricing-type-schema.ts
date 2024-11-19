import { z } from "zod";

export const PricingTypeSchema = z.enum(["Free", "Paid"], {
    required_error: "Pricing type is required.",
  });