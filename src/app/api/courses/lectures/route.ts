import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Lecture from "@/models/lecture.model";
import { lectureSchema } from "@/schemas/lecture-schema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  if (request.method !== "POST") {
    return apiResponse({
      success: false,
      message: "Method not allowed",
      status: 405,
    });
  }
  try {
    const data = await request.json();
    const parsedData = lectureSchema.safeParse(data);
    if (!parsedData.success)
      return apiResponse({
        success: false,
        status: 400,
        message: "Invalid lecture data",
        error: formatErrors(parsedData.error),
      });

    const lecData = parsedData.data;

    const lecture = await Lecture.create(lecData);

    return apiResponse({
        success: true,
                message: "Lecture created successfully",
                data: {lectureId: lecture._id},
                status: 201,
            });

  } catch (error) {
    console.log(`Error while creating lecture`, error);
    return apiResponse({
      success: false,
      message: "Error while creating lecture",
      status: 500,
      data: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}
