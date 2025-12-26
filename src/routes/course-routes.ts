import { createNewCourse, deleteCourse, getAllCourses, getCourseDetails, getInstructorCourseDetails, getInstructorCourses, saveCurriculum, updateCourseDetails } from "@/controllers/course-controller";
import { authorize } from "@/middlewares/authorize";
import { validate } from "@/middlewares/req-validation";
import { verifyRequest } from "@/middlewares/verify-request";
import { courseValidation, curriculumValidation } from "@/validations/course";
import { paramsValidation } from "@/validations/params";
import { Router } from "express";
import { param } from "express-validator";
import reviewsRouter from "./review-routes";


const router = Router()

// PUBLIC ROUTES WOULD GO HERE
router.get('/', getAllCourses)
router.get('/:id/course-details', paramsValidation, validate, getCourseDetails)



router.use('/:courseId/reviews', reviewsRouter)

// PROTECTED ROUTES WOULD GO HERE ( INSTRUCTOR ONLY )
router.use(verifyRequest, authorize(['instructor']));
router.post('/', courseValidation, validate, createNewCourse); // JUST METADATA 
router.post('/:id/curriculum', curriculumValidation, paramsValidation, validate, saveCurriculum)
router.put('/:id', paramsValidation, validate, updateCourseDetails);
router.delete('/:id', paramsValidation, validate, deleteCourse);


router.get('/my-courses', getInstructorCourses);
router.get('/my-courses/:courseId', param('courseId').notEmpty().withMessage('Course ID is required').isMongoId().withMessage('Invalid Course ID'), validate, getInstructorCourseDetails)



export default router;