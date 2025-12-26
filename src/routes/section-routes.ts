import { createSection, deleteSection, updateSection } from "@/controllers/section-controllers";
import { validate } from "@/middlewares/req-validation";
import { paramsValidation } from "@/validations/params";
import { createUpdateSectionValidation } from "@/validations/section";
import { Router } from "express";


const router = Router()

router.route('/').post(createUpdateSectionValidation, validate, createSection);
router.route('/:id').put(paramsValidation, validate, updateSection).delete(paramsValidation, validate, deleteSection);

export default router;