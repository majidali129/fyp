import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { verifyCodeSchema } from "@/types/verifyCodeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  await connectDB();

  try {
    const { code, username } = await request.json();
    const parsedCode = verifyCodeSchema.safeParse({ code });
    console.log(code, username);

    if (!parsedCode.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsedCode.error.format().code?._errors
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return apiResponse({
        success: false,
        message: "User not found",
        status: 404
      });
    }

    const isTokenNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    const isVerificationCodeValid = user.verifyCode === code;

    console.log(isTokenNotExpired, isVerificationCodeValid);

    if (isTokenNotExpired && isVerificationCodeValid) {
      user.isVerified = true;

      await user.save();

      return apiResponse({
        message: "Account verified successfully"
      });
    } else if (!isTokenNotExpired) {
      return apiResponse({
        success: false,
        message:
          "Verification code has expired. Please sign up again to get a new code.",
        status: 400
      });
    }
  } catch (error) {
    return apiResponse({
      success: false,
      message: "Error verifying email",
      status: 500
    });
  }
}
