import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Bookmarks from "@/models/bookmarks.model";
import courseReview from "@/models/courseReviews.model";
import Lecture from "@/models/lecture.model";
import Course from "@/models/newCourse.model";
import { dropFile } from "@/services/cloudinary-drop-file";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    const courseId = (await params).courseId;
    if (!courseId)
      return apiResponse({
        message: "Course Id is required to get details",
        status: 400,
      });

    const pipeline: any[] = [];
    pipeline.push({
      $match: { courseId },
    });

    // FIELDS POPULATION
    pipeline.push({
      $lookup: {
        from: "sections",
        localField: "sections",
        foreignField: "_id",
        as: "sections",
      },
    });

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "courseInstructors",
        foreignField: "_id",
        as: "courseInstructors",
      },
    });

    pipeline.push({
      $lookup: {
        from: "courseReviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
      },
    });

    pipeline.push({
      $lookup: {
        from: "bookMarks",
        localField: "bookMarks",
        foreignField: "_id",
        as: "bookMarks",
      },
    });

    const result = await Course.aggregate(pipeline);
    if (!result || result.length === 0) {
      return apiResponse({
        message: "No course found for that ID",
        status: 404,
        data: null,
      });
    }

    return apiResponse({
      message: "Course details fetched successfully",
      data: result[0],
    });
  } catch (error) {
    console.log("Error while fetching course details", error);
    return apiResponse({
      message: "Error while fetching course details",
      status: 500,
      error: error instanceof Error ? error.message : "Unkonwn Error",
    });
  }
}

export async function DELETE(request: NextRequest, {
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  await connectDB();

  try {
    const courseId = (await params).courseId;
    if (!courseId)
      return apiResponse({
        message: "Course id is required to perform action",
        success: false,
        status: 400,
      });

    const course = await Course.findById(courseId).select(
      "reviews bookMarks trailer thumbnail trailer"
    );
    if (!course)
      return apiResponse({ message: "Course do not exist", status: 404 });

    const reviews = course.reviews;
    const bookMarks = course.bookMarks;
    const trailerId = course.trailer!.public_id;
    const thumbnailId = course.thumbnail!.public_id;

    // DELETE ALL COURSE RELATED DATE BEFORE DELETING THE ACTUAL COURSE

    try {
      const dR = courseReview.deleteMany({
        _id: { $in: reviews },
      });

      const dB = Bookmarks.deleteMany({
        _id: { $in: bookMarks },
      });

      const dL = Lecture.deleteMany({
        courseId,
      });

      const deletionResults = await Promise.allSettled([
        dR,
        dB,
        dL,
        thumbnailId ? dropFile(thumbnailId) : Promise.resolve(),
        trailerId ? dropFile(trailerId) : Promise.resolve(),
      ]);

      // Log or handle partial failures
      deletionResults.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Task ${index} failed:`, result.reason);
        }
      });

      const deletedCourse = await Course.findByIdAndDelete(courseId);

      return apiResponse({
        message: "Course deleted successfully",
        data: deletedCourse,
        success: true,
      });
    } catch (error) {
      console.error("Error while deleting related documents:", error);
      return apiResponse({
        success: false,
        message: "Failed to delete course related documents",
        error,
        status: 500,
      });
    }
  } catch (error) {
    console.log("Error while deleting the course", error);
    return apiResponse({
      message: "Error while fetching the course",
      status: 500,
      error: error instanceof Error ? error.message : "Unkonwn Error",
    });
  }
}
