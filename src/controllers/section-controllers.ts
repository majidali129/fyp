import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { Section } from "@prisma/client";

// Types for request bodies
type CreateSectionRequestBody = Pick<Section, 'title' | 'order' | 'courseId'>;
type UpdateSectionRequestBody = Partial<CreateSectionRequestBody>;

// Create a new section
export const createSection = asyncHandler(async (req, res) => {
    const { title, order, courseId }: CreateSectionRequestBody = req.body;
    if (!title || !courseId) throw new ApiError(400, "title and courseId are required");

    const section = await prisma.section.create({
        data: { title, order, courseId },
    });
    return apiResponse(res, 201, "Section created successfully", section);
});

// Update an existing section
export const updateSection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData: UpdateSectionRequestBody = req.body;
    const section = await prisma.section.update({
        where: { id },
        data: updateData,
    });
    return apiResponse(res, 200, "Section updated successfully", section);
});

// Delete a section

export const deleteSection = asyncHandler(async (req, res) => {
    const sectionId = req.params.id

    await prisma.$transaction(async (tx) => {
        // 1. Find all lectures in the section
        const lectures = await tx.lecture.findMany({ where: { sectionId }, select: { id: true } });
        const lectureIds = lectures.map(l => l.id);
        const section = await tx.section.findUnique({where: {id: sectionId}, include: {course: {select: {id: true}}}});
        const courseId = section?.courseId;

        // 2. Count completed lectures per user
        let completedLectureCounts: Record<string, number> = {};
        if (lectureIds.length > 0) {
            const completedProgress = await tx.lectureProgress.findMany({
                where: { lectureId: { in: lectureIds }, isCompleted: true },
                select: { userId: true },
            });
            for (const { userId } of completedProgress) {
                completedLectureCounts[userId] = (completedLectureCounts[userId] || 0) + 1;
            }
        }

        // 5. Update enrollments for the course
        if (courseId) {
            const enrollments = await tx.enrollment.findMany({ where: { courseId } });
            for (const enrollment of enrollments) {
                const decrementTotal = lectureIds.length;
                const decrementCompleted = completedLectureCounts[enrollment.userId] || 0;
                const newTotal = Math.max(0, enrollment.totalLectures - decrementTotal);
                const newCompleted = Math.max(0, enrollment.completedLectures - decrementCompleted);
                const progressPercent = newTotal === 0 ? 0 : (newCompleted / newTotal) * 100;
                await tx.enrollment.update({
                    where: { id: enrollment.id },
                    data: {
                        totalLectures: newTotal,
                        completedLectures: newCompleted,
                        progressPercent,
                    },
                });
            }
        }

        // 6. Delete the section
        await tx.section.delete({ where: { id: sectionId } });
    });

    return apiResponse(res, 200, "Section deleted successfully");
});

