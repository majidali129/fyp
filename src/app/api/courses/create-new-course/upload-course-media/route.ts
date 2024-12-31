import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Course from "@/models/newCourse.model";
import { courseMediaSchema } from "@/schemas/course-media-schema";
import { uploadFile } from "@/services/cloudinary-video-upload";
import { NextRequest } from "next/server";
import { z } from "zod";

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
    type MediaType = z.infer<typeof courseMediaSchema>;

    const mediaData = Object.fromEntries(await request.formData()) as MediaType;
    // console.log(mediaData);

    // const parsedData = courseMediaSchema.safeParse({
    //   thumbnail: mediaData.thumbnail,
    //   trailer: mediaData.trailer,
    //   courseId: mediaData.courseId,
    // });
    // console.log(parsedData);
    // console.log(parsedData.error?.formErrors);

    // if (!parsedData.success)
    //   return apiResponse({
    //     success: false,
    //     status: 400,
    //     message: "Invalid media data",
    //     data: formatErrors(parsedData.error),
    //   });
    // const { thumbnail, trailer, courseId } = parsedData.data;
    // if (!courseId)
    //   return apiResponse({
    //     success: false,
    //     message: "Course id is required",
    //     status: 400,
    //   });

    const [thumbnailFile, trailerFile] = await Promise.all([
      await uploadFile(mediaData.thumbnail),
      await uploadFile(mediaData.trailer),
    ]);
    const course = await Course.findById(mediaData.courseId);

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
