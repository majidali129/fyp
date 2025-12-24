import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";




export const uploadProfilePhoto = asyncHandler(async (req, res) => {
    console.log('File uploaded successfully', req.file)

    return apiResponse(res, 200, 'Profile photo uploaded successfully')
})