import { auth } from "@/helpers/auth";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { verifySession } from "@/lib/sessions";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const cookieStore = await cookies();
    // const user = await auth();
    const {userId} = await verifySession()
    await User.findByIdAndUpdate(
      userId,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    cookieStore.set("accessToken", "", cookieOption);
    cookieStore.set("refreshToken", "", cookieOption);

    const response = NextResponse.json({
      message: "User logged out",
      success: true,
    });
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    NextResponse.redirect(new URL("/sign-in", request.url));
    return response;
  } catch (error) {
    console.log("Error while logging out", error);

    return apiResponse({
      success: false,
      message: "Error while logging out",
      error: error instanceof Error ? error.message : "Unknown Error",
      status: 500,
    });
  }

}
