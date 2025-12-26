import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";

export const enrollInCourse = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.body;

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } }
    });

    if (existing) throw new ApiError(400, "Already enrolled in this course");

    // Get total lectures for progress tracking
    const totalLectures = await prisma.lecture.count({
        where: { section: { courseId } }
    });

    const enrollment = await prisma.enrollment.create({
        data: {
            userId,
            courseId,
            totalLectures
        }
    });
    return apiResponse(res, 201, "Enrolled successfully", enrollment);
});

// Get all enrollments for the logged-in student
export const getMyEnrollments = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        select: {
            id: true,
            totalLectures: true,
            completedLectures: true,
            progressPercent: true,
            enrolledAt: true,
            course: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnailUrl: true,
                    instructor: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    username: true,
                                    image: true,
                        }
                    }
                },
                
            },
        }
    });
    return apiResponse(res, 200, "My enrollments fetched", enrollments);
});

// Get details of a specific enrollment
export const getEnrollmentDetails = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const enrollment = await prisma.enrollment.findUnique({
        where: {userId, id},
        select: {
            id: true,
            totalLectures: true,
            completedLectures: true,
            progressPercent: true,
            enrolledAt: true,
            course: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    thumbnailUrl: true,
                    trailerUrl: true,
                    instructor: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                            image: true,
                        }
                    }
                }
            }
        }
    });
    if (!enrollment) throw new ApiError(404, "Enrollment not found");
    return apiResponse(res, 200, "Enrollment details fetched", enrollment);
});

// Unenroll from a course
export const unenrollFromCourse = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id: enrollmentId } = req.params;
    const enrollment = await prisma.enrollment.delete({
        where: {id: enrollmentId, userId}
    });
    return apiResponse(res, 200, "Unenrolled successfully", enrollment);
});
