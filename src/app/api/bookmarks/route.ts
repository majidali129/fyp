// get all bookmarks
// add to bookmark

import { isMongoId } from "@/helpers/isMongoId";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Bookmarks from "@/models/bookmarks.model";
import Course from "@/models/newCourse.model";
import { Schema } from "mongoose";
import { NextRequest } from "next/server";

const getBookmarks = async (userId: string) => {
  const bookmarkStats = await Bookmarks.aggregate([
    {
      $match: { owner: userId },
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "courses",
        localField: "items.courseId",
        foreignField: "_id",
        as: "course",
      },
    },

    {
      $project: {
        course: { $first: "$course" },
        "course.title": 1,
        "course.ratings": 1,
        "course.avgRatings": 1,
        "course.reviews": 1,
        "course.price": 1,
        "course.oldPrice": 1,
        "course.thumbnail": 1,
        "course.trailer": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        totalBookmarks: { $sum: 1 },
        items: {
          $push: "$$ROOT",
        },
      },
    },
  ]);

  return (
    bookmarkStats[0] ?? {
      _id: null,
      items: [],
      totalBookmarks: 0,
    }
  );
};

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    //TODO: get userid from request
    const bookMarks = await getBookmarks("user-123");

    return apiResponse({
      message: "Bookmarks fetched successfully",
      status: 200,
      data: {...bookMarks},
    });
  } catch (error) {
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
    const { courseId, quantity } = await request.json();
    if (!isMongoId(courseId))
      return apiResponse({ message: "Invalid course ID", status: 400 });

    const course = await Course.findById(new Schema.Types.ObjectId(courseId));
    if (!course)
      return apiResponse({ message: "Course no longer exists", status: 404 });

    const bookmarks = await Bookmarks.findOne({ owner: "user-id" });

    const addedCourse = bookmarks?.items.find(
      (course) => course.courseId === courseId
    );

    if (addedCourse) {
      addedCourse.quantity = quantity;
    } else {
      bookmarks?.items.push({ courseId, quantity });
    }

    await bookmarks?.save();
  } catch (error) {
    console.log("Error while adding to bookmark", error);
    return apiResponse({
      message: "Error while saving course to bookmark",
      status: 500,
      error: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}
