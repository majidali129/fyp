// import { Section } from "@/context/new-course/defs";
// import { formatErrors } from "@/helpers/parseErrors";
// import { apiResponse } from "@/lib/apiResponse";
// import { connectDB } from "@/lib/connectDB";
// import CourseSection from "@/models/courseSection.model";
// import Lecture from "@/models/lecture.model";
// import LectureModel from "@/models/lecture.model";
// import Course, { ICourse } from "@/models/newCourse.model";
// import { sectionSchema } from "@/schemas/section-schema";
// import { uploadAndTranscodeVideo } from "@/services/cloudinary-video-upload";
// import { ObjectId } from "mongoose";
// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// /**
//  * ! Make sure to check user role befor any DB operations
//  */


// export async function PATCH(request: NextRequest) {
//   // connect to DB
//   await connectDB();
//   try {
//     // TODO: Receive req data
//     const formData = await request.formData();
//     // const section = formData.get('section');

//     const parsedSecData = sectionSchema.safeParse(formData);

//     if (!parsedSecData.success) {
//       return apiResponse({
//         status: 400,
//         success: false,
//         message: "Invalid section data",
//         data: parsedSecData.error.errors,
//       });
//     }
//     type Section = z.infer<typeof sectionSchema>;
// // console.log('Section: ', section);
// const secData = parsedSecData.data as Section;

// if(!secData) return apiResponse({
//   success: false,
//   message: "Invalid section data",
//   status: 400,
//   error: formatErrors(parsedSecData?.error!),
// })

//     const {
//       lectures,
//       title: secTitle,
//       order: secOrder,
//       publicId: secPublicId,
//       courseId
//     } = secData;

//     const course = (await Course.findById(courseId)) as ICourse;
//     if (!course) {
//       return apiResponse({
//         success: false,
//         message: "Course not found. Make sure to create course from scratch.",
//         status: 404,
//       });
//     }

//     // upload all lectures to cloudinary
//     const uploadedLecs = await Promise.allSettled(
//       lectures.map(async (lecture) => {
//         // TODO: upload lecture to cloudinary
//         try {
//           const { video, title, description, caption, publicId, order, tags } =
//             lecture;
//           const res = await uploadAndTranscodeVideo(video); // TO FILE SYSTEM

//           const newLecture = {
//             title,
//             caption,
//             description,
//             publicId,
//             order,
//             tags,
//             video: {
//               public_id: res.public_id,
//               playback_url: res.playback_url,
//               resolutions: res.resolutions,
//             },
//           };

//           const newLectureDoc = await LectureModel.create(newLecture);
//           return { status: "fulfilled", value: newLectureDoc._id };
//         } catch (error) {
//           console.error("Error uploading lecture:", error);
//           return { status: "rejected", reason: error };
//         }
//       })
//     );

//     // Separate successful and failed uploads
//     const successfulLectures = uploadedLecs
//       .filter((result) => result.status === "fulfilled")
//       .map((result) => result.value);
//     const failedLectures = uploadedLecs.filter(
//       (result) => result.status === "rejected"
//     );

//     // If no lectures uploaded successfully, abort
//     if (successfulLectures.length === 0) {
//       return apiResponse({
//         success: false,
//         message: "All lecture uploads failed.",
//         status: 500,
//       });
//     }

//     const newSection = {
//       title: secTitle,
//       order: secOrder,
//       publicId: secPublicId,
//       lectures: uploadedLecs,
//     };

//     const savedSection = await CourseSection.create(newSection);

//     // Add section ID to the course document
//     course.sections.push(savedSection._id as ObjectId);

//     await course.save();

//     // Return response
//     return apiResponse({
//       success: true,
//       message: "Section created successfully.",
//       status: 201,
//       data: {
//         section: savedSection,
//         failedLectures,
//       },
//     });
//   } catch (error) {
//     console.log("Error creating new course", error);

//     return apiResponse({
//       success: false,
//       message: "Error while creating new course",
//       status: 500,
//       data: error instanceof Error ? error.message : "Unknow Error",
//     });
//   }
// }
