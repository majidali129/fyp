import EmailTemplate from "../../mails/EmailTemplate";
import EmailVerificationTemplate from "../../mails/EmailTemplate";
import { resend } from "@/lib/resend";

type EmailVerificationProps = {
  email: string;
  subject: string;
  code?: string;
  username: string;
  emailType?: "Verification" | "PasswordReset";
  resetToken?: string;
};

const sendEmail = async ({
  email,
  username,
  subject,
  code,
  emailType,
  resetToken
}: EmailVerificationProps) => {
  try {
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: subject,
      react: EmailTemplate({
        username,
        otp: code,
        emailType,
        resetToken
      })
    });

    console.log("Email verification send response ", data);
    return {
      success: true,
      message: "Verification email sent successfully ✅"
    };
  } catch (emailError) {
    return {
      success: false,
      message: "Failed to send verification email."
    };
  }
};

export default sendEmail;
