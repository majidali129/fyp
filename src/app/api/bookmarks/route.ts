// get all bookmarks
// add to bookmark

import { auth } from "@/helpers/auth";
import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession, verifySession } from "@/lib/sessions";
import UserBookmarks from "@/models/bookmarks.model";
import Course from "@/models/newCourse.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const session = await getSession();

    const bookmarks = await UserBookmarks.aggregate([
      {
        $match: { bookmarkedBy: new mongoose.Types.ObjectId(session?.userId) },
      },
      {
        $lookup: {
          from: "courses",
          foreignField: "_id",
          localField: "courseId",
          as: "course",
        },
      },
      {
        $project: {
          courseId: 1,
          title: 1,
          category: 1,
          ratings: 1,
          avgRatings: 1,
          price: 1,
          oldPrice: 1,
          reviews: 1,
          thumbnail: 1,
          createdBy: 1
        },
      },
      {
        $sort: {
          createdAt: -1,
        }
      }
    ]);

    return apiResponse({
      message: "Bookmarks fetched successfully",
      data: { bookmarks },
    });
  } catch (error) {
    console.log(error);

    return apiResponse({
      message: "Error while fetching bookmarks",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const session = await getSession();
    if (!session) {
      return apiResponse({
        success: false,
        message:
          "You are not logged in! please log in to add course to wishlist",
        status: 401,
      });
    }
    const { userId } = session;
    const { courseId } = await request.json();

    if (!isMongoId(courseId))
      return apiResponse({ message: "Invalid course ID", status: 400 });

    const course = await Course.findById(courseId);

    if (!course)
      return apiResponse({ message: "Course no longer exists", status: 404 });

    const isAlreadyBookmarked = await UserBookmarks.findOne({
      courseId,
      bookmarkedBy: userId,
    });
    console.log("already bookmarked", isAlreadyBookmarked);

    if (isAlreadyBookmarked) {
      await UserBookmarks.findOneAndDelete({
        courseId,
        bookmarkedBy: userId,
      });

      return apiResponse({
        message: "Bookmark deleted successfully",
        status: 200,
      });
    } else {
      await UserBookmarks.create({
        courseId,
        bookmarkedBy: userId,
      });

      return apiResponse({
        message: "Bookmark added successfully",
        status: 201,
        data: { isBookmarked: true },
      });
    }
  } catch (error) {
    console.log("Error while adding to bookmark", error);
    return apiResponse({
      message: "Error while performing action to bookmark",
      status: 500,
    });
  }
}
