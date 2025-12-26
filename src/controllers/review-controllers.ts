import { isOwner } from "@/helpers/is-owner";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { CourseReview } from "@prisma/client";


type NewReview = Pick<CourseReview, 'message' | 'rating' | 'courseId'>;

// TODO: Input Validation, Output Pagination, Filtering, Sorting

export const addNewReview = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { message, rating, courseId } = req.body as NewReview;

    await prisma.$transaction(async (tx) => {

        // existing one
        const existingReview = await tx.courseReview.findUnique({
            where: { userId_courseId: { userId, courseId } }
        })

        if (existingReview) throw new ApiError(400, "You have already reviewed this course");

        const course = await tx.course.findUnique({
            where: { id: courseId },
            select: { avgRating: true, totalRatings: true }
        });

        await tx.courseReview.create({
            data: {
                rating,
                message,
                courseId,
                userId
            }
        })

        const oldCount = course?.totalRatings || 0;
        const oldAvg = course?.avgRating || 0;
        const newCount = oldCount + 1;
        const newAvg = ((oldAvg * oldCount) + rating) / newCount;

        await tx.course.update({
            where: { id: courseId },
            data: {
                avgRating: newAvg,
                totalRatings: newCount
            }
        })
    })

    return apiResponse(res, 201, "Review added successfully" )
})

export const getAllReviews = asyncHandler(async (req, res) => { 
    const { id: courseId } = req.params;

    const reviews = await prisma.courseReview.findMany({
        where: { courseId },
        include: {
            user: { select: { fullName: true, username: true, image: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return apiResponse(res, 200, "Reviews fetched successfully", reviews)
})

export const getReview = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await prisma.courseReview.findUnique({
        where: { id },
        include: {
            user: { select: { fullName: true, username: true, image: true } }
        }
    });

    if (!review) {
        return apiResponse(res, 404, "Review not found");
    }

    return apiResponse(res, 200, "Review fetched successfully", review)
 })

export const editReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { message, rating, courseId } = req.body as NewReview

  await prisma.$transaction(async (tx) => {
    // Get the old review
    const oldReview = await tx.courseReview.findUnique({ where: { id } });
    if (!oldReview) throw new ApiError(404, "Review not found");

    // Get course stats
    const course = await tx.course.findUnique({
        where: { id: courseId },
        select: { avgRating: true, totalRatings: true }
    });

    // Update the review
    await tx.courseReview.update({
        where: { id },
        data: { message, rating, updatedAt: new Date() }
    });

    // Calculate new average
    const oldCount = course?.totalRatings || 0;
    const oldAvg = course?.avgRating || 0;
    const newAvg = oldCount > 0
        ? ((oldAvg * oldCount) - oldReview.rating + rating) / oldCount
        : rating;

    await tx.course.update({
        where: { id: courseId },
        data: { avgRating: newAvg, updatedAt: new Date() }
    });
});   

    return apiResponse(res, 200, "Review updated successfully");
 })



export const deleteReview = asyncHandler(async (req, res) => { 
    const { id } = req.params;
    const userId = req.user.id;
    await prisma.$transaction(async (tx) => {
        const review = await tx.courseReview.findUnique({
            where: { id },
            select: { rating: true, courseId: true, userId: true }
        });

        if (!review) throw new ApiError(404, "Review not found");
        if (!isOwner(review.userId, userId)) throw new ApiError(403, "Not authorized to delete this review");

        const course = await tx.course.findUnique({
            where: { id: review.courseId },
            select: { avgRating: true, totalRatings: true }
        });

        await tx.courseReview.delete({ where: { id } });

        const oldCount = course?.totalRatings || 0;
        const oldAvg = course?.avgRating || 0;
        const newCount = Math.max(oldCount - 1, 0);
        let newAvg = 0;
        if (newCount > 0) {
            newAvg = ((oldAvg * oldCount) - review.rating) / newCount;
        }

        await tx.course.update({
            where: { id: review.courseId },
            data: { avgRating: newAvg, totalRatings: newCount, updatedAt: new Date() }
        });
    });

    return apiResponse(res, 200, "Review deleted successfully");
});