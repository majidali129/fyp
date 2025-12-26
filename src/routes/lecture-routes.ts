import { createLecture, deleteLecture, getLectureDetails, updateLecture } from "@/controllers/lecture-controller";
import { validate } from "@/middlewares/req-validation";
import { createUpdateLectureValidation } from "@/validations/lecture";
import { paramsValidation } from "@/validations/params";
import { Router } from "express";


const router = Router();

router.route('/:id').get(paramsValidation, validate, getLectureDetails).delete(paramsValidation, validate, deleteLecture)

router.post('/', createUpdateLectureValidation, validate, createLecture);
router.put('/:id/update', createUpdateLectureValidation, validate, updateLecture)


export default router;