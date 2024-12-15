// get all bookmarks
// add to bookmark

import { auth } from "@/helpers/auth";
import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession, verifySession } from "@/lib/sessions";
import UserBookmarks from "@/models/bookmarks.model";
import Course from "@/models/newCourse.model";
import { NextRequest } from "next/server";

const getBookmarks = async (userId: string) => {
  const bookmarkStats = await UserBookmarks.aggregate([
    {
      $match: { owner: userId },
    },
    {
      $unwind: "$courses",
    },
    {
      $lookup: {
        from: "courses",
        localField: "courses.courseId",
        foreignField: "_id",
        as: "course",
      },
    },

    {
      $project: {
        course: { $first: "$course" },
      },
    },

    // {
    //   $project: {
    //     course: { $first: "$course" },
    //     "course.title": 1,
    //     "course.ratings": 1,
    //     "course.avgRatings": 1,
    //     "course.reviews": 1,
    //     "course.price": 1,
    //     "course.oldPrice": 1,
    //     "course.thumbnail": 1,
    //     "course.trailer": 1,
    //   },
    // },
    {
      $group: {
        _id: "$_id",
        totalBookmarks: { $sum: 1 },
        courses: {
          $push: "$$ROOT",
        },
      },
    },
  ]);

  return (
    bookmarkStats[0] ?? {
      _id: null,
      courses: [],
      totalBookmarks: 0,
    }
  );
};

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    //TODO: get userid for authorization from request
    const session = await getSession();
    if (!session) {
      return apiResponse({
        success: false,
        message: "You are not logged in! please log in to get access",
        status: 401,
      });
    }

    /**
     * TODO:
     * ! limit course fields on populate
     */
    const bookmarks = await UserBookmarks.find({
      bookmarkedBy: session.userId,
    }).populate("courseId");

    return apiResponse({
      message: "Bookmarks fetched successfully",
      status: 200,
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
