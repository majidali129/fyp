import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must me 8 character long" })
});

const updatePasswordSchema = z.object({
  oldPassword: z
    .string().refine((data) => data.trim() !== '', { message: 'Old password is required' }),
  newPassword: z
    .string()
    .min(1, { message: "Password must me 8 character long" }),
})

export { forgotPasswordSchema, resetPasswordSchema, updatePasswordSchema };
