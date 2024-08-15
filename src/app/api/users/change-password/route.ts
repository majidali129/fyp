import UserModel from "@/models/user.model";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { auth } from "../../../../../auth";
import mongoose from "mongoose";

export async function PATCH(request: NextRequest) {
  await connectDB();

  const session = await auth();

  if (!session?.user || session.user.isVerified) {
    return apiResponse({
      success: false,
      message: "Unauthorized access",
      status: 401
    });
  }

  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword) {
      return apiResponse({
        success: false,
        message: "Please provide old password to set new one",
        status: 400
      });
    }
    if (!newPassword) {
      return apiResponse({
        success: false,
        message: "Please provide new password",
        status: 400
      });
    }

    const userId = new mongoose.Types.ObjectId(session.user._id);
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      return apiResponse({
        success: false,
        message: "User or Account no longer exist",
        status: 401 // Unauthorized for invalid tokens
      });
    }

    const isOldPasswordCorrect = await bcryptjs.compare(
      oldPassword,
      user.password
    );

    if (!isOldPasswordCorrect) {
      return apiResponse({
        success: false,
        message: "Invalid old password. please add the right one",
        status: 400 // Unauthorized for invalid tokens
      });
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = newHashedPassword;

    await user.save();

    return apiResponse({
      success: true,
      message: "Password changed successfully",
      status: 200 // Unauthorized for invalid tokens
    });
  } catch (error) {
    console.log("Error while updating password", error);

    return apiResponse({
      success: false,
      message: "Error while updating password",
      status: 500
    });
  }
}
