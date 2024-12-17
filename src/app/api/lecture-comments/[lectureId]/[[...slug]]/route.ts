import { isMongoId } from "@/helpers/isMongoId";
import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import { getSession } from "@/lib/sessions";
import LectureComments from "@/models/LectureComments.model";
import {
  lectureCommentSchema,
  updateCommentSchema,
} from "@/schemas/lecture-comment-schema";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lectureId: string }> }
) {
  await connectDB();
  try {
    // http://localhost:3000/api/lecture-comments/lecId
    const lectureId = (await params).lectureId;

    const session = await getSession();
    if (!session)
      return apiResponse({
        success: false,
        message: "User not logged in",
        status: 401,
      });

    if (!isMongoId(lectureId))
      return apiResponse({
        success: false,
        message: "Invalid lecture ID",
        status: 400,
      });

    const comments = await LectureComments.find({
      lectureId,
    }).populate("replies");

    return apiResponse({
      message: "Comments fetched successfully",
      data: { comments, totalComments: comments.length },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return apiResponse({
      success: false,
      message: "Error fetching comments",
      status: 500,
      error: error.message || "Internal Server Error",
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lectureId: string }> }
) {
  await connectDB();
  try {
    // http://localhost:3000/api/lecture-comments/lecId
    const session = await getSession();
    const lectureId = (await params).lectureId;

    if (!session)
      return apiResponse({
        success: false,
        message:
          "You are not logged in! please log in to add comment to lecture",
        status: 401,
      });
    const { userId } = session;
    const parsedData = lectureCommentSchema.safeParse(await request.json());
    if (!parsedData.success) {
      return apiResponse({
        success: false,
        status: 400,
        message: "Invalid comment data",
        error: formatErrors(parsedData.error),
      });
    }

    const { comment } = parsedData.data;
    const newComment = await LectureComments.create({
      commentedBy: userId,
      lectureId,
      comment,
    });

    return apiResponse({
      status: 201,
      success: true,
      message: "Comment posted successfully",
      data: { comment: newComment },
    });
  } catch (error) {
    console.error("Error posting comments:", error);
    return apiResponse({
      success: false,
      message: "Error while posting comment to lecture",
      status: 500,
      error: error.message || "Internal Server Error",
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  await connectDB();
  try {
    // http://localhost:3000/api/lecture-comments/lecId/commentId
    const slug = (await params).slug!;
    const commentId = slug[0];
    const session = await getSession();
    const parsedData = updateCommentSchema.safeParse(await request.json());
    if (!parsedData.success) {
      return apiResponse({
        success: false,
        status: 400,
        message: "Invalid comment data",
        error: formatErrors(parsedData.error),
      });
    }

    const { comment: newComment } = parsedData.data;
    if (!session)
      return apiResponse({
        success: false,
        message: "User not logged in",
        status: 401,
      });

    if (!isMongoId(commentId))
      return apiResponse({
        success: false,
        message: "Invalid comment ID",
        status: 400,
      });
    const targetComment = await LectureComments.findByIdAndUpdate(
      commentId,
      {
        $set: {
          comment: newComment,
        },
      },
      {
        new: true,
      }
    );
    if (!targetComment)
      return apiResponse({
        success: false,
        message: "Comment not found for this ID!!!",
        status: 404,
      });

    /**
     * ! CHECK FOR COMMNET OWNER TO UPDATE NOT BE ALLOWED TO UPDATE BY OTHERS
     */

    const isOwner =
      targetComment.commentedBy.toString() === session.userId.toString();

    if (!isOwner)
      return apiResponse({
        success: false,
        message: "Only commnet owner can update",
        status: 403,
      });

    targetComment.comment = newComment;

    const updatedComment = await targetComment.save();

    return apiResponse({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comments:", error);
    return apiResponse({
      success: false,
      message: "Error while updating comment",
      status: 500,
      error: error,
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  await connectDB();
  try {
    // http://localhost:3000/api/lecture-comments/commentId
    const slug = (await params).slug;
    const commentId = slug[0];
    const session = await getSession();

    if (!session)
      return apiResponse({
        success: false,
        message: "User not logged in",
        status: 401,
      });

    if (!isMongoId(commentId))
      return apiResponse({
        success: false,
        message: "Invalid comment ID",
        status: 400,
      });

    const targetComment = await LectureComments.findById(commentId);
    if (!targetComment)
      return apiResponse({
        success: false,
        message: "Comment not found for this ID 😒",
        status: 404,
      });

    /**
     * ! CHECK FOR COMMNET OWNER TO DELETE NOT BE ALLOWED TO DELETE BY OTHERS
     */

    const isOwner =
      targetComment.commentedBy.toString() === session.userId.toString();

    if (!isOwner)
      return apiResponse({
        success: false,
        message: "Only commnet owner can delete",
        status: 403,
      });

    const deletedComment = await LectureComments.findByIdAndDelete(commentId);

    if (!deletedComment)
      return apiResponse({
        success: false,
        message: "Comment not found for this ID !",
        status: 404,
      });

    return apiResponse({
      success: true,
      message: "Comment deleted successfully",
      data: deletedComment,
    });
  } catch (error) {
    console.error("Error deleting comments:", error);
    return apiResponse({
      success: false,
      message: "Error while deleting comment",
      status: 500,
      error: error,
    });
  }
}
