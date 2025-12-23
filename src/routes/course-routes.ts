import { createNewCourse, deleteCourse, getAllCourses, getCourseDetails, saveCurriculum, updateCourseDetails } from "@/controllers/course-controller";
import { authorize } from "@/middlewares/authorize";
import { validate } from "@/middlewares/req-validation";
import { verifyRequest } from "@/middlewares/verify-request";
import { courseValidation, curriculumValidation } from "@/validations/course";
import { paramsValidation } from "@/validations/params";
import { Router } from "express";


const router = Router()

// PUBLIC ROUTES WOULD GO HERE
router.get('/', getAllCourses)
router.get('/:id', paramsValidation, validate, getCourseDetails)


// PROTECTED ROUTES WOULD GO HERE
router.use(verifyRequest, authorize(['instructor']));
router.post('/', courseValidation, validate, createNewCourse); // JUST METADATA 
router.post('/:id/curriculum', curriculumValidation, paramsValidation, validate, saveCurriculum)
router.put('/:id', paramsValidation, validate, updateCourseDetails);
router.delete('/:id', paramsValidation, validate, deleteCourse);



export default router;