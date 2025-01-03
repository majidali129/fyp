import User from "@/models/user.model";
import { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken'

export async function PATCH(request: NextRequest) {
  await connectDB();

  try {
    const cookieStore = await cookies();
    const incomingAccessToken = cookieStore.get('accessToken')?.value;

    if(!incomingAccessToken)
      return apiResponse({
    success: false,
     message: "Unauthorized request. Access token not found.",
     status: 401
    });
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword) {
      return apiResponse({
        success: false,
        message: "Please provide old password to set new one",
        status: 400,
      });
    }
    if (!newPassword) {
      return apiResponse({
        success: false,
        message: "Please provide new password",
        status: 400,
      });
    }

    const decodedToken = await jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload

    console.log(decodedToken);


    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return apiResponse({
        success: false,
        message: "User or Account no longer exist",
        status: 401
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
        status: 400,
      });
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = newHashedPassword;

    await user.save();

    return apiResponse({
      success: true,
      message: "Password changed successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Error while updating password", error);

    return apiResponse({
      success: false,
      message: "Error while updating password",
      status: 500,
    });
  }
}
