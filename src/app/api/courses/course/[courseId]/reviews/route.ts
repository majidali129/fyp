import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import CourseReview from "@/models/courseReviews.model";
import Course from "@/models/newCourse.model";
import { courseReviewSchema } from "@/schemas/course-review-schema";
import { Types } from "mongoose";
import { NextRequest } from "next/server";


// /api/courses/course/course-id/reviews => get, add or update , delete
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    // TODO: get userID from request header after user authorizations

    const courseId = (await params).courseId;
    const requestData = await request.json();
    const parsedData = courseReviewSchema.safeParse(requestData);
    if (!parsedData.success) {
      return apiResponse({
        message: "Invalid review data",
        status: 400,
        error: parsedData.error.flatten().fieldErrors,
      });
    }

    const addedReview = await CourseReview.updateOne(
      { userId: "user-1", courseId },
      {
        ...parsedData,
        courseId,
        userId: "user-101",
      },
      { upsert: true }
    );

    const reviewStats = await CourseReview.aggregate([
      {
        $match: { courseId: new Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: "$courseId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const { avgRating = 0, count = 0 } = reviewStats[0] || {};

    await Course.updateOne(
      { _id: courseId },
      {
        avgRatings: avgRating,
        ratings: count,
      }
    );

    return apiResponse({
      message:
        addedReview.upsertedCount > 0
          ? "Review added successfully"
          : "Review updated successfully",
      status: 201,
      data: { avgRating, ratingsCount: count },
    });
  } catch (error) {
    console.log("Error while reviewing to course.", error);
    return apiResponse({
      message: "Error while adding review to course",
      status: 500,
      error: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}

export async function GET({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  await connectDB();

  try {
    const courseId = (await params).courseId;
    if (!isMongoId(courseId))
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });

    const reviews = await CourseReview.aggregate([
      {
        $match: { courseId: new Types.ObjectId(courseId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          rating: 1,
          review: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.username": 1,
          "user.profilePhoto": 1,
        },
      },
    ]);

    return apiResponse({
      message: "Course reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.log("Error while getting reviews on this course", error);
    return apiResponse({
      message: "Error while geting course reviews",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}

export async function DELETE({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  await connectDB();
  try {
    const courseId = (await params).courseId;
    if (!isMongoId(courseId))
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });

    const deletedReview = await CourseReview.findOneAndDelete({
      userId: "user-123",
      courseId,
    });

    console.log("deleted review result", deletedReview);
    if (!deletedReview) {
      return apiResponse({
        message: "Review not found or unauthorized to delete",
        status: 404,
      });
    }

    const reviewStats = await CourseReview.aggregate([
      {
        $match: { courseId: new Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: "$courseId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const { avgRating = 0, count = 0 } = reviewStats[0] || {};

    await Course.findByIdAndUpdate(courseId, {
      avgRatings: avgRating,
      ratings: count,
    });

    return apiResponse({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting review on this course", error);
    return apiResponse({
      message: "Error while deleting course review",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}

