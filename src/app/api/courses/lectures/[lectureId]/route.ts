import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import LectureModel from "@/models/lecture.model";
import { lectureUpdateSchema } from "@/schemas/lecture-update-schema";
import { NextRequest } from "next/server";

/**
 * ! Make sure to check user role befor any DB operations
 */


export async function GET(
  request: Request,
  { params }: { params: Promise<{ lectureId: string }> }
) {
  await connectDB();

  try {
    const lectureId = (await params).lectureId;
    if (!lectureId) {
      return apiResponse({
        success: false,
        message: "Lecture Id is required",
        status: 400,
        data: null,
      });
    }

    const lecture = await LectureModel.findById(lectureId)
      .populate("notes")
      .populate("comments");
    if (!lecture) {
      return apiResponse({
        success: true,
        message: "Lecture not found for that ID",
        status: 404,
        data: null,
      });
    }

    return apiResponse({
      message: "Lecture found successfully",
      data: lecture,
    });
  } catch (error) {
    console.log(`Error while fetching lecture`, error);
    return apiResponse({
      success: false,
      message: "Error while fetching lecture",
      status: 500,
      data: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ lectureId: string }> }
) {
  await connectDB();

  try {
    const lectureId = (await params).lectureId;

    if (!lectureId) {
      return apiResponse({
        success: false,
        message: "Lecture Id is required",
        status: 400,
        data: null,
      });
    }

    const lecture = await LectureModel.findById(lectureId);
    if (!lecture) {
      return apiResponse({
        success: true,
        message: "Lecture not found for that ID",
        status: 404,
        data: null,
      });
    }

    const formData = await request.formData();
    const parsedFormData = lectureUpdateSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!parsedFormData.success) {
      return apiResponse({
        success: false,
        message: "Invalid course data",
        status: 400,
        data: parsedFormData.error,
      });
    }

    const newLecData = parsedFormData.data;
    const {
      title,
      description,
      caption,
      order,
      publicId,
      tags,
      video,
      isNewVideo,
    } = newLecData;
    lecture.title = title!;
    lecture.description = description!;
    lecture.caption = caption!;
    lecture.order = order!;
    lecture.publicId = publicId!;
    lecture.tags = tags!;


    await lecture.save();

    const refreshedLecture = await LectureModel.findById(lectureId);

    return apiResponse({
      message: "Lecture updated successfully",
      data: refreshedLecture,
    });
  } catch (error) {
    console.log("Error while updating lecture", error);
    return apiResponse({
      message: "Error while updating lecture",
      status: 500,
      data: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}

export async function DELETE(request: NextRequest, {
  params,
}: {
  params: Promise<{ lectureId: string }>;
}) {
  await connectDB();
  try {
    const lectureId = (await params).lectureId;

    if (!lectureId) {
      return apiResponse({
        success: false,
        message: "Lecture Id is required",
        status: 400,
        data: null,
      });
    }

    const lecture = await LectureModel.findByIdAndDelete(lectureId);
    if (!lecture) {
      return apiResponse({
        success: true,
        message: "Lecture not found for that ID",
        status: 404,
        data: null,
      });
    }

    return apiResponse({
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    console.log(`Error while updating lecture`, error);
    return apiResponse({
      success: false,
      message: "Error while updating lecture",
      status: 500,
      data: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}
