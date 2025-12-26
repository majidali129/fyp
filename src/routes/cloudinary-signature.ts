import { generateCloudinarySignature } from "@/helpers/generate-signature";
import { authorize } from "@/middlewares/authorize";
import { verifyRequest } from "@/middlewares/verify-request";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";


const router = Router()


router.use(verifyRequest, authorize(['instructor', 'admin']));

router.get('/generate', asyncHandler(async (req, res) => {
    const type = req.query.type as 'lecture' | 'profile' | 'trailer' | 'thumbnail';
    if (!type || !['lecture', 'profile', 'trailer', 'thumbnail'].includes(type)) throw new ApiError(400, 'Invalid type parameter. Must be one of lecture, profile, trailer, thumbnail.');

    const signatureData = generateCloudinarySignature(type);

    return apiResponse(res, 200, 'Cloudinary signature generated successfully', signatureData);
}))


export default router;