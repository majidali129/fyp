import { Router } from "express";
import { enrollInCourse, getMyEnrollments, getEnrollmentDetails, unenrollFromCourse } from "@/controllers/enrollment-controller";
import { verifyRequest } from "@/middlewares/verify-request";
import { authorize } from "@/middlewares/authorize";

const router = Router();

router.route('/').post(verifyRequest, authorize(['student']), enrollInCourse)
    .get(verifyRequest, authorize(['student']), getMyEnrollments);

router.route('/:id').get(verifyRequest, authorize(['student']), getEnrollmentDetails)
    .delete(verifyRequest, authorize(['student']), unenrollFromCourse);



export default router;





