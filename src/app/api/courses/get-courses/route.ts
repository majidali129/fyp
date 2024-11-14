import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import CourseModel from "@/models/newCourse.model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    return apiResponse({
      success: true,
      message: "Courses fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Error while getting courses: ", error);

    return apiResponse({
      success: false,
      message: "Error while getting courses",
      status: 500,
    });
  }
}
