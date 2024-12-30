import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Course from "@/models/newCourse.model";
import { uploadFile } from "@/services/cloudinary-video-upload";
import { NextRequest } from "next/server";
import { z } from "zod";

const mediaSchema = z.object({
  courseId: z.string(),
  thumbnail: z.any().refine((value) => value === null || value === undefined, {
    message: "Course thumbnail is required",
  }),
  trailer: z.any().refine((value) => value === null || value === undefined, {
    message: "Course trailer is required",
  }),
});

export async function PATCH(request: NextRequest) {
  await connectDB();
  if (request.method !== "PATCH") {
    return apiResponse({
      success: false,
      message: "Method not allowed",
      status: 405,
    });
  }
  try {
    const formData = await request.formData();
    const parsedData = mediaSchema.safeParse(Object.entries(formData));
    if (!parsedData.success)
      return apiResponse({
        success: false,
        status: 400,
        message: "Invalid media data",
        data: formatErrors(parsedData.error),
      });
    const { thumbnail, trailer, courseId } = parsedData.data;
    if (!courseId)
      return apiResponse({
        success: false,
        message: "Course id is required",
        status: 400,
      });

    const [thumbnailFile, trailerFile] = await Promise.all([
      await uploadFile(thumbnail),
      await uploadFile(trailer),
    ]);
    const course = await Course.findById(courseId);

    if (!course)
      return apiResponse({
        success: false,
        message: "Course not found. Make sure to create course from scratch.",
        status: 404,
      });

    course.thumbnail = {
      public_id: thumbnailFile.public_id,
      secure_url: thumbnailFile.secure_url,
      url: thumbnailFile.url,
      bytes: thumbnailFile.bytes,
    };
    course.trailer = {
      public_id: trailerFile.public_id,
      duration: trailerFile.duration!,
      secure_url: trailerFile.secure_url,
      url: trailerFile.url,
      bytes: trailerFile.bytes,
    };
    await course.save();

    return apiResponse({
      success: true,
      message: "Files uploaded successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Error while saving course data", error);
    return apiResponse({
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}
