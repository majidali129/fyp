import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import Course from "@/models/newCourse.model";
import formidable from "formidable";
import { NextRequest } from "next/server";

/**
 * ! Make sure to check user role befor any DB operations
 */

export async function POST(request: NextRequest) {
  await connectDB();
  if (request.method !== "POST") {
    return apiResponse({
      success: false,
      message: "Method not allowed",
      status: 405,
    });
  }
    try {
      const data = await request.json();
      console.log('Metadata: ', data);

      const course = await Course.create({
        ...data});
      return apiResponse({
        success: true,
        message: "Course created successfully",
        data: {courseId: course._id},
        status: 201,
      });
    } catch (error) {
      console.log('Error while saving course data', error);
      return apiResponse({
        success:false,
        status: 500,
        message: error instanceof Error ? error.message : "Unknow Error",
      })
    }
  }

// const schema = z.object({
//   trailer: z.any().refine((value) => value === null || value === undefined, {
//     message: "Course trailer is required",
//   }),
//   thumbnail: z.any().refine((value) => value === null || value === undefined, {
//     message: "Course thumbnail is required",
//   }),
// })


// export async function POST(request: NextRequest) {
//   await connectDB();
//   if (request.method !== "POST") {
//     return apiResponse({
//       success: false,
//       message: "Method not allowed",
//       status: 405,
//     });
//   }

//   try {
//     const formData = await request.formData();
//     const parsedData = Object.fromEntries(formData.entries());

//     const result = schema.safeParse(parsedData);
//     if (!result.success) {
//       return apiResponse({
//         success: false,
//         message: "Thumbnail & Trailer are required",
//         status: 400,
//         error: formatErrors(result.error),
//       });
//     }

//     console.log("Result: ", result);

//     const { thumbnail, trailer } = result.data;

//     const [courseThumbnail, courseTrailer] = await Promise.all([
//       uploadFile(thumbnail),
//       uploadFile(trailer),
//     ]);

//     const course = await CourseModel.create({
//       thumbnail: {
//         public_id: courseThumbnail.public_id,
//         url: courseThumbnail.url,
//         bytes: courseThumbnail.bytes,
//         secure_url: courseThumbnail.secure_url,
//       },
//       trailer: {
//         public_id: courseTrailer.public_id,
//         url: courseTrailer.url,
//         duration: courseTrailer.duration,
//         bytes: courseTrailer.bytes,
//         secure_url: courseTrailer.secure_url,
//       },
//     });

//     return apiResponse({
//       success: true,
//       message: "Course created successfully",
//       data: {courseId: course._id},
//       status: 201,
//     });
//   } catch (error) {
//     console.log("Error while creating new course");
//     return apiResponse({
//       success: false,
//       message: "Failed to create new course",
//       status: 500,
//       data: error instanceof Error ? error.message : "Unknow Error",
//     });
//   }
// }



// export async function PATCH (request: NextRequest) {
//   await connectDB();
//   if (request.method !== "PATCH") {
//     return apiResponse({
//       success: false,
//       message: "Method not allowed",
//       status: 405,
//     });
//   }
// }

