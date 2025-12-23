import { body } from "express-validator";


// Validation for just course metadata excluding curriculum

export const courseValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ max: 150 })
        .withMessage('Title must be less than 150 characters'), 
    body('subtitle')
        .notEmpty()
        .withMessage('Subtitle is required')
        .isString()
        .withMessage('Subtitle must be a string')
        .isLength({ max: 300 })
        .withMessage('Subtitle must be less than 300 characters'),
    body('topic')
        .notEmpty()
        .withMessage('Topic is required')
        .isString()
        .withMessage('Topic must be a string'),
    body('language')
        .notEmpty()
        .withMessage('Language is required')
        .isString()
        .withMessage('Language must be a string'),
    body('level')   
        .notEmpty()
        .withMessage('Level is required')
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Level must be one of beginner, intermediate, advanced'),
    body('duration')
        .notEmpty()
        .withMessage('Duration is required')
    .isIn(["days_1_7", "weeks_1_4", "months_1_3", "months_3_6", "months_6_12"])
        .withMessage('Duration must be one of days_1_7, weeks_1_4, months_1_3, months_3_6, months_6_12'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string'),
    body('targetAudience')
        .isArray({ min: 1 })
        .withMessage('At least one target audience is required.'),  
    body('requirements')
        .isArray({ min: 1 })
        .withMessage('At least one requirement is required.'),
    body('learningOutcomes')
        .isArray({ min: 1 })
        .withMessage('At least one learning outcome is required.'),
    body('thumbnailUrl')
        .optional()
        .isString()
        .withMessage('Thumbnail URL must be a string')
        .isURL()
        .withMessage('Thumbnail URL must be a valid URL'),
        body('trailerUrl')
        .optional()
        .isString()
        .withMessage('Trailer URL must be a string')
        .isURL()
        .withMessage('Trailer URL must be a valid URL'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isInt({ min: 0 })
        .withMessage('Price must be a non-negative integer'),   
    body('welcomeMessage')
        .optional()
        .isString()
        .withMessage('Welcome message must be a string'),
    body('congratulationsMessage')
        .optional()
        .isString()
        .withMessage('Congratulations message must be a string'),
    body('subCategoryId')
        .notEmpty()
        .withMessage('SubCategory ID is required')
        .isString()
        .withMessage('SubCategory ID must be a string')
]

// Validation for course curriculum
export const curriculumValidation = [
    body('curriculum')
        .isArray({ min: 1 })
        .withMessage('Curriculum can\'t be empty.'),
    body('curriculum.*.title')
        .notEmpty()
        .withMessage('Section title is required')
        .isString()
        .withMessage('Section title must be a string'),
    body('curriculum.*.order')
        .notEmpty()
        .withMessage('Section order is required')
        .isInt({ min: 0 })
        .withMessage('Section order must be a non-negative integer'),
    body('curriculum.*.lectures')
        .isArray({ min: 1 })
        .withMessage('At least one lecture is required in each section.'),
    body('curriculum.*.lectures.*.title')
        .notEmpty()
        .withMessage('Lecture title is required')
        .isString()
        .withMessage('Lecture title must be a string'),
    body('curriculum.*.lectures.*.order')
        .notEmpty()
        .withMessage('Lecture order is required')
        .isInt({ min: 0 })
        .withMessage('Lecture order must be a non-negative integer'),
    body('curriculum.*.lectures.*.caption')
        .optional()
        .isString()
        .withMessage('Lecture caption must be a string'),
        body('curriculum.*.lectures.*.description')
        .optional()
        .isString()
        .withMessage('Lecture description must be a string'),
        body('curriculum.*.lectures.*.videoUrl')
        .notEmpty()
        .withMessage('Lecture video URL is required')
        .isString()
        .withMessage('Lecture video URL must be a string').isURL().withMessage('Lecture video URL must be a valid URL'),
        body('curriculum.*.lectures.*.duration')
        .notEmpty()
        .withMessage('Lecture duration is required')
        .isInt({ min: 0 })
        .withMessage('Lecture duration must be a non-negative integer'),
        body('curriculum.*.lectures.*.isPreview')
        .optional()
        .isBoolean()
        .withMessage('Lecture isPreview must be a boolean'),
]