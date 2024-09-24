import { z } from "zod";

export const instructorSocialFormSchema = z.object({
  "website-url": z.string().trim().min(1, {message: 'Please enter your website url'}).url({ message: "Please enter a valid URL." }),
  "facebook-username": z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  "insta-username": z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  "linkedin-username": z
    .string()

    .min(3, { message: "Username must be at least 3 characters long." }),
  "twitter-username": z
    .string()

    .min(3, { message: "Username must be at least 3 characters long." }),
  "whatsapp-number": z
    .string()

    .regex(/^\d{10,15}$/, { message: "Enter a valid phone number." }),
  "youtube-username": z
    .string()

    .min(3, { message: "Username must be at least 3 characters long." }),
});

