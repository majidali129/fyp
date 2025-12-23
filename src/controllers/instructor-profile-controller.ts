import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { Instructor_Profile } from "@prisma/client";


type InstructorProfileData = Omit<Instructor_Profile, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'isDeleted'>;

export const createOrUpdateProfile = asyncHandler(async (req, res) => {
    const profileData: InstructorProfileData = req.body;
    const userId = req.user.id;

    const isProfileExist = await prisma.instructor_Profile.findUnique({
        where: { userId },
    })

    const profile = await prisma.instructor_Profile.upsert({
        where: { userId },
        update: profileData,
        create: { ...profileData, userId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    image: true,
                }
            }
        }
    })


    const isCreated = !!isProfileExist;
    const message = isCreated ? 'Profile updated successfully' : 'Profile created successfully';
    return apiResponse(res, 200, message, profile);

})


export const deleteProfile = asyncHandler(async (req, res) => { 
    const userId = req.user.id;

    const profile = await prisma.instructor_Profile.findUnique({
        where: { userId },
    })

    if(!profile) throw new ApiError(404, 'Profile no longer exists');

    // Soft delete by setting isDeleted to true
    await prisma.instructor_Profile.update({
        where: { userId },
        data: { isDeleted: true },
    })

    return apiResponse(res, 200, 'Instructor profile deleted successfully', null);
})

export const getProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const profile = await prisma.instructor_Profile.findUnique({
        where: { userId, isDeleted: false },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    image: true,
                    fullName: true,
                }
            }
        }
    })
    if(!profile) throw new ApiError(404, 'Profile not found');

    return apiResponse(res, 200, 'Instructor profile fetched successfully', profile);
 })