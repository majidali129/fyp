import UserModel from "@/models/user.model";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import sendEmail from "@/helpers/sendEmailVerification";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email } = await request.json();
    if (!email) {
      return apiResponse({
        success: false,
        message: "Please provide your email address to reset password",
        status: 400
      });
    }


    const user = await UserModel.findOne({ email });
    if (!user) {
      return apiResponse({
        success: false,
        message:
          "Account or user not found for this email. Please register first to proceed",
        status: 404
      });
    }
    if (!user.isVerified) {
      return apiResponse({
        success: false,
        message: "Please verify your accont first to proceed.",
        status: 404
      });
    } else {
      const resetToken = await bcryptjs.hash(process.env.SECRET_KEY!, 10);
      const resetTokenExpiry = new Date();
      resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 30);

      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpiry = resetTokenExpiry;

      await user.save();

      // SEND EMAIL TO USER
      const emailResponse = await sendEmail({
        email,
        username: user.username,
        subject: "Password Reset Request",
        resetToken,
        emailType: "PasswordReset"
      });

      if (!emailResponse.success) {
        return apiResponse({
          success: false,
          message: emailResponse.message,
          status: 500
        });
      }

      return apiResponse({
        message:
          "Request submitted successfully. Please check your email to reset password",
        status: 200
      });
    }
  } catch (error) {
    console.log("Error in forgot password request", error);

    return apiResponse({
      success: false,
      message: "Error in forgot password request",
      status: 500
    });
  }
}
