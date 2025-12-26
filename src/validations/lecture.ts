import { body } from "express-validator";

export const createUpdateLectureValidation = [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
    body('order').notEmpty().withMessage('Order is required').isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
    body('sectionId').notEmpty().withMessage('sectionId is required').isString().withMessage('sectionId must be a string'),
    body('videoUrl').notEmpty().withMessage('VideoUrl is required').isURL().withMessage('VideoUrl must be a valid URL'),
    body('caption').optional().isString().withMessage('Caption must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('isPreview').isBoolean().withMessage('isPreview must be a boolean'),
    body('duration').notEmpty().withMessage('Duration is required').isInt({ min: 0 }).withMessage('Duration must be a non-negative integer'),
]