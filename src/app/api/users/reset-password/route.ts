import UserModel from "@/models/user.model";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { apiResponse } from "@/lib/apiResponse";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { token, newPassword } = await request.json();

    if (!token) {
      return apiResponse({
        success: false,
        message: "Please provide a valid reset password token",
        status: 400
      });
    }

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: new Date() }
    });
    if (!user) {
      return apiResponse({
        success: false,
        message: "Invalid or expired reset password token",
        status: 401 // Unauthorized for invalid tokens
      });
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = newHashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;

    await user.save();

    return apiResponse({
      success: true,
      message: "New password has been set successfully",
      status: 200 // Unauthorized for invalid tokens
    });
  } catch (error) {
    console.log("Error while reseting password", error);

    return apiResponse({
      success: false,
      message: "Error while reseting password",
      status: 500
    });
  }
}

// $2a$10$C8OE.2n7KvjPkxw02Ynsr.FXyeRugkHvckAFkdESwUEnCWMPTdHky old
// $2a$10$j1JVCPgajdq7Td.BAzXFh.PdRXAgKSg/E.45anauxRhf1dJIpZ7S. new
