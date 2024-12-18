import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { decrypt, getSession, setAccessAndRefreshTokens } from "@/lib/sessions";
import User from "@/models/user.model";
import { cookies } from "next/headers";

export async function POST() {
  await connectDB();

  try {
    const cookieStore = await cookies();
    const commingRefreshToken = cookieStore.get("refreshToken")?.value;
    if (!commingRefreshToken)
      return apiResponse({
        status: 401,
        message: "Unauthorized request",
      });

    const decodedToken = await decrypt(
      commingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET!
    );
    const currentUser = await User.findById(decodedToken.userId);
    if (!currentUser)
      return apiResponse({
        status: 401,
        message: "Invalid refresh token!",
      });

    if (commingRefreshToken !== currentUser.refreshToken)
      return apiResponse({
        status: 401,
        message: "Refresh token got expired. Please login again to get access.",
      });

    const { accessToken, refreshToken } = await setAccessAndRefreshTokens(
      currentUser._id as string
    );

    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    cookieStore.set("accessToken", accessToken, cookieOption);
    cookieStore.set("refreshToken", refreshToken, cookieOption);

    return apiResponse({
      status: 200,
      message: "Token refreshed successfully",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return apiResponse({
      status: 500,
      message: "Failed to refresh token",
      error: error.message,
    });
  }
}
