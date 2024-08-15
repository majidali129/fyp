import { Resend } from "resend";
import EmailVerificationTemplate from "../../mails/EmailVerificationTemplate";

type EmailVerificationProps = {
  email: string;
  subject: string;
  verifyCode: string;
  username: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailVerification = async ({
  email,
  subject,
  username,
  verifyCode
}: EmailVerificationProps) => {
  try {
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: subject,
      react: EmailVerificationTemplate({ username, otp: verifyCode })
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

export default sendEmailVerification;
