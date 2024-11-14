import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import CourseSectionModel from "@/models/courseSection.model";
import LectureModel from "@/models/lecture.model";
import CourseModel from "@/models/newCourse.model";
import {
  createCourseSchema,
  LectureSchema,
  SectionSchema,
} from "@/schemas/create-course-schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const courseData = await request.json();
    console.log(courseData);

    const parsedCourseData = createCourseSchema.safeParse(courseData);
    if (!parsedCourseData.success) {
      const formatedError = parsedCourseData.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));
      return NextResponse.json(
        {
          success: false,
          message: formatedError,
        },
        { status: 400 }
      );
    }
    const { sections } = parsedCourseData.data;
    console.log(sections);

    const sectionPromises = sections.map(async (section) => {
      const parsedSection = SectionSchema.parse(section);
      // STORING LECS TO DB
      const lectureDocs = await Promise.all(
        parsedSection.lectures.map(
          async (lecture: any) => await LectureModel.create(lecture)
        )
      );
      // GETING LEC'S REFERENCE
      const lectureIds = lectureDocs.map((lecture) => lecture._id);

      // STORING SECS TO DB ALONG WITH LEC'S REFERENCE
      const savedSections = await CourseSectionModel.create({
        ...section,
        lectures: lectureIds,
      });

      return savedSections._id;
    });

    // GETING SEC'S REFERENCE
    const sectionIds = await Promise.all(sectionPromises);

    const savedCourse = await CourseModel.create({
      ...courseData,
      sections: sectionIds, // Add section IDs to the course document
    });

    return apiResponse({
      success: true,
      message: "Course created successfully",
      data: savedCourse,
      status: 201,
    });
  } catch (error) {
    console.log("Error creating new course", error);

    return apiResponse({
      success: false,
      message: "Error creating new course",
      status: 500,
    });
  }
}
