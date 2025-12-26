// Pick<Section, 'title' | 'order' | 'courseId'>;

import { body } from "express-validator";

export const createUpdateSectionValidation = [
    body("title").notEmpty().withMessage("Title is required").isString().withMessage("Title must be a string"),
    body("order").notEmpty().withMessage("Order is required").isInt({ min: 0 }).withMessage("Order must be a non-negative integer"),
    body("courseId").notEmpty().withMessage("courseId is required").isString().withMessage("courseId must be a string"),
]