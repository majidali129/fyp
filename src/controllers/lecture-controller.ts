import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { Lecture, LectureProgress } from "@prisma/client";

type DeleteLectureRequestBody = {
    sectionId: string;
}

type LectureProgressRequestBody = Pick<LectureProgress, 'courseId' | 'watchedSeconds' | 'completedAt'>;

type CreateNewLectureRequestBody = Pick<Lecture, 'title' | 'order' | 'sectionId' | 'videoUrl' | 'caption' | 'description' | 'isPreview' | 'duration'>;


export const getLectureDetails = asyncHandler(async (req, res) => { 
    const id = req.params.id!;
    const lecture = await prisma.lecture.findUnique({
        where: { id },
        include: {
            lectureProgress: true
        }
    });

    if (!lecture) throw new ApiError(404, "Lecture not found");
    
    return apiResponse(res, 200, "Lecture details fetched", lecture);

 })

export const deleteLecture = asyncHandler(async (req, res) => { 
    const id = req.params.id!;
    const { sectionId } = req.body as DeleteLectureRequestBody;
    
    await prisma.$transaction(async (tx) => {

        const section = await tx.section.findUnique({
        where: { id: sectionId },
        include: {
            course: {
                select: { id: true, instructorId: true, authorId: true }
            }
        }
    })

        // 1. Decrement totalLectures for all enrollments in the course
        await tx.enrollment.updateMany({
            where: {
                courseId: section?.course.id
            },
            data: {
                totalLectures: {
                    decrement: 1
                }
            }
        });

        // 2. For students who completed this lecture, decrement completedLectures
        const enrolledStudentsIds = await tx.lectureProgress.findMany({
            where: { lectureId: id, isCompleted: true },
            select: { userId: true }
        }).then(arr => arr.map(lp => lp.userId));

        await tx.enrollment.updateMany({
            where: {
                courseId: section?.course.id
                ,
                userId: {
                    in: enrolledStudentsIds
                },

            },
            data: { completedLectures: { decrement: 1 } }
        })

        // 3. Recalculate progressPercent for all enrollments in the course 
        // NOTE: We can use aggregaion as well.
        const enrollments = await tx.enrollment.findMany({
            where: { courseId: section?.course.id }
        });


        for (const enrollment of enrollments) {
            const progressPercent = enrollment.totalLectures === 0 ? 0 :
                (enrollment.completedLectures / enrollment.totalLectures) * 100;
            await tx.enrollment.update({
                where: { id: enrollment.id },
                data: { progressPercent }
            });
        }

    await tx.lecture.delete({ where: { id } });
    })

    return apiResponse(res, 200, "Lecture deleted successfully");
    
 })


// Mark lecture as completed
export const markLectureComplete = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const lectureId = req.params.id!;
    const { courseId } = req.body as LectureProgressRequestBody;
    if (!courseId) throw new ApiError(400, "courseId is required");

    await prisma.$transaction(async (tx) => {
        // Get old progress
        const oldProgress = await tx.lectureProgress.findUnique({ where: { lectureId_userId: { lectureId, userId } } });
        // Upsert to completed
        await tx.lectureProgress.upsert({
            where: { lectureId_userId: { lectureId, userId } },
            update: { isCompleted: true, completedAt: new Date() },
            create: { lectureId, userId, courseId, isCompleted: true, completedAt: new Date() },
        });

        // Update Enrollment if not already completed
        if (!oldProgress?.isCompleted) {
            const enrollment = await tx.enrollment.findUnique({
                where: { userId_courseId: { userId, courseId } },
            });
            if (enrollment) {
                const completedLectures = enrollment.completedLectures + 1;
                const progressPercent = enrollment.totalLectures === 0 ? 0 : (completedLectures / enrollment.totalLectures) * 100;
                await tx.enrollment.update({
                    where: { id: enrollment.id },
                    data: { completedLectures, progressPercent },
                });
            }
        }
    });
    return apiResponse(res, 200, "Lecture marked as completed");
});

// Mark lecture as incomplete
export const markLectureIncomplete = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const lectureId = req.params.id!;
    const { courseId } = req.body as LectureProgressRequestBody;
    if (!courseId) throw new ApiError(400, "courseId is required");

    await prisma.$transaction(async (tx) => {
        // Get old progress
        const oldProgress = await tx.lectureProgress.findUnique({ where: { lectureId_userId: { lectureId, userId } } });
        // Upsert to incomplete
        await tx.lectureProgress.upsert({
            where: { lectureId_userId: { lectureId, userId } },
            update: { isCompleted: false, completedAt: null },
            create: { lectureId, userId, courseId, isCompleted: false, completedAt: null },
        });

        // Update Enrollment if was previously completed
        if (oldProgress?.isCompleted) {
            const enrollment = await tx.enrollment.findUnique({
                where: { userId_courseId: { userId, courseId } },
            });
            if (enrollment) {
                const completedLectures = Math.max(0, enrollment.completedLectures - 1);
                const progressPercent = enrollment.totalLectures === 0 ? 0 : (completedLectures / enrollment.totalLectures) * 100;
                await tx.enrollment.update({
                    where: { id: enrollment.id },
                    data: { completedLectures, progressPercent },
                });
            }
        }
    });
    return apiResponse(res, 200, "Lecture marked as incomplete");
});

// Update watched seconds only (no completion toggle)
export const updateLectureWatchedSeconds = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const lectureId = req.params.id!;
    const { courseId, watchedSeconds } = req.body as LectureProgressRequestBody;
    if (!courseId) throw new ApiError(400, "courseId is required");
    if (watchedSeconds == null) throw new ApiError(400, "watchedSeconds is required");

    await prisma.lectureProgress.upsert({
        where: { lectureId_userId: { lectureId, userId } },
        update: { watchedSeconds },
        create: { lectureId, userId, courseId, watchedSeconds, isCompleted: false },
    });

    return apiResponse(res, 200, "Lecture watched seconds updated");
});




export const updateLecture = asyncHandler(async (req, res) => {
    const id = req.params.id!;
    const updateData: Partial<CreateNewLectureRequestBody> = req.body;

    const lecture = await prisma.lecture.update({
        where: { id },
        data: updateData,
    });


    return apiResponse(res, 200, "Lecture updated successfully", lecture);
});


export const createLecture = asyncHandler(async (req, res) => {
    const {
        title,
        order,
        sectionId,
        videoUrl,
        caption,
        description,
        isPreview = false,
        duration,
    }: CreateNewLectureRequestBody = req.body;


    const lecture = await prisma.lecture.create({
        data: {
            title,
            order,
            sectionId,
            videoUrl,
            caption,
            description,
            isPreview,
            duration,
        },
    });

    if(!lecture) throw new ApiError(500, "Failed to create lecture");

    // Increment totalLectures in enrollments for the course
    const section = await prisma.section.findUnique({ where: { id: sectionId }, include: { course: true } });
    if (section?.course?.id) {
        await prisma.enrollment.updateMany({
            where: { courseId: section.course.id },
            data: { totalLectures: { increment: 1 } },
        });
    }

    return apiResponse(res, 201, "Lecture created successfully", lecture);
});