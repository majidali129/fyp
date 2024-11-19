import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import CourseSectionModel from "@/models/courseSection.model";
import LectureModel from "@/models/lecture.model";
import CourseModel, { ICourse } from "@/models/newCourse.model";
import { sectionSchema } from "@/schemas/section-schema";
import { uploadAndTranscodeVideo } from "@/services/cloudinary-video-upload";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function PATCH(request: NextRequest) {
  // connect to DB
  await connectDB();
  try {
    // TODO: Receive req data
    // const { section } = await request.json();
    const formData = await request.formData();

    const sectionData  = formData.get("section")

    // TODO: Validate req data
    if (!sectionData ) {
      return apiResponse({
        success: false,
        message: "Section data is required.",
        status: 400,
      });
    }


    const results = sectionSchema.safeParse(sectionData);
    if (!results.success) {
      return apiResponse({
        success: false,
        message: "invalid section data",
        data: results.error.errors,
      });
    }
    type Section = z.infer<typeof sectionSchema>;

    const {
      lectures,
      title: secTitle,
      order: secOrder,
      publicId: secPublicId,
      courseId,
    } = results.data as Section;

    const course = (await CourseModel.findById(courseId)) as ICourse;
    if (!course) {
      return apiResponse({
        success: false,
        message: "Course not found.",
        status: 404,
      });
    }

    // upload all lectures to cloudinary
    const uploadedLecs = await Promise.allSettled(
      lectures.map(async (lecture) => {
        // TODO: upload lecture to cloudinary
        try {
          const { video, title, description, caption, publicId, order, tags } =
            lecture;
          const res = await uploadAndTranscodeVideo(video);

          const newLecture = {
            title,
            caption,
            description,
            publicId,
            order,
            tags,
            video: {
              playback_url: res.playback_url,
              resolutions: res.resolutions,
            },
          };

          const newLectureDoc = await LectureModel.create(newLecture);
          return { status: "fulfilled", value: newLectureDoc._id };
        } catch (error) {
          console.error("Error uploading lecture:", error);
          return { status: "rejected", reason: error };
        }
      })
    );

    // Separate successful and failed uploads
    const successfulLectures = uploadedLecs
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const failedLectures = uploadedLecs.filter(
      (result) => result.status === "rejected"
    );

    // If no lectures uploaded successfully, abort
    if (successfulLectures.length === 0) {
      return apiResponse({
        success: false,
        message: "All lecture uploads failed.",
        status: 500,
      });
    }

    const newSection = {
      title: secTitle,
      order: secOrder,
      publicId: secPublicId,
      lectures: uploadedLecs,
    };

    const savedSection = await CourseSectionModel.create(newSection);

    // Add section ID to the course document
    course.sections.push(savedSection._id as ObjectId);

    // console.log("updated-course", updatedCourse);
    await course.save();

    // Return response
    return apiResponse({
      success: true,
      message: "Section created successfully.",
      status: 201,
      data: {
        section: savedSection,
        failedLectures,
      },
    });
  } catch (error) {
    console.log("Error creating new course", error);

    return apiResponse({
      success: false,
      message: "Error while creating new course",
      status: 500,
    });
  }
}
