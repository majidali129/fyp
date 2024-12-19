import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Course from "@/models/newCourse.model";
import { NextRequest } from "next/server";

// ENABLE CACHING
export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;
  try {
    const {
      search,
      sort,
      category,
      rating,
      courseLevel,
      courseDuration,
      pricingType,
    } = Object.fromEntries(searchParams);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    console.log(searchParams);

    const pipeline: any[] = [];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    if (category) {
      pipeline.push({
        $match: { category },
      });
    }

    if (rating) {
      pipeline.push({
        $match: { ratings: { $gte: parseFloat(rating) } },
      });
    }

    if (courseLevel) {
      pipeline.push({
        $match: { courseLevel },
      });
    }

    if (courseDuration) {
      pipeline.push({
        $match: { courseDuration }, // i.e 3-5 months
      });
    }

    if (pricingType) {
      pipeline.push({
        $match: { pricingType },
      });
    }

    const sortMapping: Record<string, { field: string; order: 1 | -1 }> = {
      "most-popular": { field: "popularity", order: -1 },
      "highest-rated": { field: "rating", order: -1 },
      latest: { field: "createdAt", order: -1 },
      oldest: { field: "createdAt", order: 1 },
      "price-low-to-high": { field: "price", order: 1 },
      "price-high-to-low": { field: "price", order: -1 },
      "duration-short-to-long": { field: "duration", order: 1 },
      "duration-long-to-short": { field: "duration", order: -1 },
      "enrolled-high-to-low": { field: "enrollmentCount", order: -1 },
      "enrolled-low-to-high": { field: "enrollmentCount", order: 1 },
    };

    const sortConfig = sortMapping[sort];

    if (sortConfig) {
      pipeline.push({
        $sort: {
          [sortConfig.field]: sortConfig.order,
        },
      });
    } else {
      pipeline.push({
        $sort: { createdAt: -1 }, // Default sort
      });
    }

    // PAGENATION

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // This state will add discountPercentage to each document, and subsequent stages can access it later
    pipeline.push({
      $addFields: {
        discountPercentage: {
          $multiply: [
            { $divide: [{ $subtract: ["$price", "$discount"] }, "$price"] },
            100,
          ],
        },
      },
    });

    pipeline.push({
      $group: {
        _id: null,
        totalCourses: { $sum: 1 },
        courses: { $push: "$$ROOT" },
      },
    });

    pipeline.push({
      $project: {
        courses: 1,
        totalCourses: 1,
      },
    });

    // console.log("Pipeline:", JSON.stringify(pipeline, null, 2));
    const results = await Course.aggregate(pipeline);

    return apiResponse({
      message: "Courses fetched successfully",
      data: results[0],
    });
  } catch (error) {
    console.log("Error while getting courses: ", error);

    return apiResponse({
      success: false,
      message: "Error while getting courses",
      status: 500,
    });
  }
}
