import { createOrUpdateProfile, deleteProfile, getProfile } from "@/controllers/instructor-profile-controller";
import { authorize } from "@/middlewares/authorize";
import { validate } from "@/middlewares/req-validation";
import { verifyRequest } from "@/middlewares/verify-request";
import { instructorProfileValidation } from "@/validations/instructor-profile";
import { Router } from "express";


const router = Router()

router.use(verifyRequest, authorize(['instructor']))

router.post('/', instructorProfileValidation, validate, createOrUpdateProfile)

router.delete('/', deleteProfile )
router.get('/', getProfile)



export default router;