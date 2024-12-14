import { auth } from "@/helpers/auth";
import { apiResponse } from "@/lib/apiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await auth();

    return apiResponse({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error instanceof Error && error.message }, { status: 401 });
  }
}
