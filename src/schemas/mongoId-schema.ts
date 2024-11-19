import { isMongoId } from "validator";
import { z } from "zod";

export const objectIdSchema = z.string().refine(isMongoId);
