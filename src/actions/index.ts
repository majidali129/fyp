"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";

export const loginUser = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};
