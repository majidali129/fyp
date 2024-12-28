import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import CourseModel from "@/models/newCourse.model";
import { createCourseSchema } from "@/schemas/course-schema";
import { uploadFile } from "@/services/cloudinary-video-upload";
import formidable from "formidable";
import { NextRequest } from "next/server";

/**
 * ! Make sure to check user role befor any DB operations
 */

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

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
    const formData = await request.formData();
    const parsedData = Object.fromEntries(formData.entries()); // 1. Parse the form data into an object
    console.log("Parsed Data: ", parsedData);
    const formatedData = {
      ...parsedData,
      whatYouWillTeach: JSON.parse(parsedData.whatYouWillTeach as string),
      targetAudience: JSON.parse(parsedData.targetAudience as string),
      courseRequirements: JSON.parse(parsedData.courseRequirements as string),
      courseInstructors: JSON.parse(parsedData.courseInstructors as string),
    };

    console.log("Formated Data: ", formatedData);

    const result = createCourseSchema.safeParse(formatedData);
    if (!result.success) {
      return apiResponse({
        success: false,
        message: "Invalid course data",
        status: 400,
        error: formatErrors(result.error),
      });
    }

    console.log("Result: ", result);

    const { thumbnail, trailer } = result.data;

    const [courseThumbnail, courseTrailer] = await Promise.all([
      uploadFile(thumbnail),
      uploadFile(trailer),
    ]);

    const course = await CourseModel.create({
      ...result.data,
      thumbnail: {
        public_id: courseThumbnail.public_id,
        url: courseThumbnail.url,
        bytes: courseThumbnail.bytes,
      },
      trailer: {
        public_id: courseTrailer.public_id,
        url: courseTrailer.url,
        duration: courseTrailer.duration,
        bytes: courseTrailer.bytes,
      },
    });

    return apiResponse({
      success: true,
      message: "Course created successfully",
      data: course,
      status: 201,
    });
  } catch (error) {
    console.log("Error while creating new course");
    return apiResponse({
      success: false,
      message: "Failed to create new course",
      status: 500,
      data: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}
