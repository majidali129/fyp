import { auth } from "@/helpers/auth";
import { apiResponse } from "@/lib/apiResponse";
import { getSession } from "@/lib/sessions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if(!session) return apiResponse({
      message: "User not logged in",
      success: false,
      status: 401,
    });

    return apiResponse({
      message: "User fetched successfully",
      data: session.user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error instanceof Error && error.message },
      { status: 401 }
    );
  }
}
