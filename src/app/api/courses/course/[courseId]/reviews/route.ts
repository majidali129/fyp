import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import CourseReview from "@/models/courseReviews.model";
import Course from "@/models/newCourse.model";
import { courseReviewSchema } from "@/schemas/course-review-schema";
import mongoose, { Types } from "mongoose";
import { NextRequest } from "next/server";
import { getSession } from "../../../../../../lib/sessions";
import { formatErrors } from "@/helpers/parseErrors";

// /api/courses/course/course-id/reviews => get, add or update , delete
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  await connectDB();

  try {
    const courseId = (await params).courseId;
    const session = await getSession();

    if (!session)
      return apiResponse({
        message: "User not logged in",
        success: false,
        status: 401,
      });
    const { userId } = session;
    const requestData = Object.fromEntries(await request.formData());
    const parsedData = courseReviewSchema.safeParse({
      ...requestData,
    });

    if (!parsedData.success) {
      return apiResponse({
        success: false,
        message: "Invalid review data",
        status: 400,
        error: formatErrors(parsedData.error),
      });
    }

    const addedReview = await CourseReview.findOneAndUpdate(
      { userId, courseId },
      { ...parsedData.data, courseId, userId },
      { new: true, upsert: true, includeResultMetadata: true }
    );

    const reviewStats = await CourseReview.aggregate([
      {
        $match: { courseId: new Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: "courseId",
          nRatings: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    if (reviewStats.length > 0) {
      await Course.findByIdAndUpdate(courseId, {
        avgRatings: reviewStats[0].avgRating,
        ratings: reviewStats[0].nRatings,
      });
    } else {
      await Course.findByIdAndUpdate(courseId, {
        avgRatings: 0,
        ratings: 0,
      });
    }

    return apiResponse({
      message: addedReview.lastErrorObject?.updatedExisting
        ? "Review updated successfully"
        : "Review added successfully",
      status: 201,
      data: reviewStats[0],
    });
  } catch (error) {
    return apiResponse({
      message: "Error while adding review to course",
      status: 500,
      error: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
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
        $match: { courseId: new mongoose.Types.ObjectId(courseId) },
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
          "user._id": 1,
        },
      },
    ]);

    return apiResponse({
      message: "Course reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    return apiResponse({
      message: "Error while geting course reviews",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseId: string }>;
  }
) {
  await connectDB();
  try {
    const courseId = (await params).courseId;
    if (!isMongoId(courseId))
      return apiResponse({
        message: "Invalid course ID",
        status: 400,
      });

    const session = await getSession();
    if (!session)
      return apiResponse({
        message: "User not logged in",
        success: false,
        status: 401,
      });
    const { userId } = session;

    const deletedReview = await CourseReview.findOneAndDelete({
      userId,
      courseId,
    });

    if (!deletedReview) {
      return apiResponse({
        message: "No review found for this course by the current user",
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
          nRatings: { $sum: 1 },
        },
      },
    ]);

    if (reviewStats.length > 0) {
      await Course.findByIdAndUpdate(courseId, {
        avgRatings: reviewStats[0].avgRating,
        ratings: reviewStats[0].nRatings,
      });
    } else {
      await Course.findByIdAndUpdate(courseId, {
        avgRatings: 0,
        ratings: 0,
      });
    }

    return apiResponse({
      message: "Review deleted successfully",
    });
  } catch (error) {
    return apiResponse({
      message: "Error while deleting course review",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}
