import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model";
import { loginUserSchema } from "@/schemas/loginUserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/helpers/generate-tokens";
import mongoose from "mongoose";
import { cookies } from "next/headers";

const setAccessAndRefreshTokens = async (userId: string) => {
  await connectDB();

  try {
    const user = await User.findById({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (!user) throw new Error("User not found to geenerate tokens");
    const accessToken = await generateAccessToken(
      user._id as string,
      user.username,
      user.role
    );
    const refreshToken = await generateRefreshToken(
      user._id as string,
      user.username,
      user.role
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(
      "Something went wrong while generating access refresh token",
      error
    );

    throw new Error(
      "Something went wrong while generating access refresh token"
    );
  }
};

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const cookieStore = await cookies();
    const formData = await request.json();
    const parsedData = loginUserSchema.safeParse(formData);
    if (!parsedData.success) {
      return apiResponse({
        success: false,
        message: "Invalid user data",
        status: 400,
        error: parsedData.error.flatten().fieldErrors,
      });
    }

    const { username, password } = parsedData.data;
    const user = await User.findOne({ username });

    if (!user)
      return apiResponse({
        success: false,
        message: "Invalid username or password. Try again",
        status: 400,
      });
console.log(await bcryptjs.hash(password, 10), user.password);

    // dcrypt the password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect)
      return apiResponse({
        success: false,
        message: "Invalid email or password. Try again",
        status: 400,
      });

    const { accessToken, refreshToken } = await setAccessAndRefreshTokens(
      user._id as string
    );


    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    const loggedInUser = await User.findOne({username}).select(
      "-password -refreshToken"
    );


    cookieStore.set('accessToken', accessToken, cookieOption);
    cookieStore.set('refreshToken', refreshToken, cookieOption);

    return apiResponse({
      message: 'User logged In successfully',
      data: {user: loggedInUser, accessToken, refreshToken}
    })

  } catch (error) {
    console.log("Error while signing in", error);
    return apiResponse({
      message: "An error occurred while signing in",
      status: 500,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
