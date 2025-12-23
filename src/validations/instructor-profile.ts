import { body } from "express-validator";

export const instructorProfileValidation = [
    body('headline')
        .notEmpty()
        .withMessage('Headline is required')
        .isString()
        .withMessage('Headline must be a string')
        .isLength({ max: 200 })
        .withMessage('Headline must be less than 200 characters'),
    body('bio')
        .optional()
        .isString()
        .withMessage('Bio must be a string')
        .isLength({ max: 2000 })
        .withMessage('Bio must be less than 2000 characters'),
    body('phone')
        .optional()
        .isString()
        .withMessage('Phone must be a string')
        .isMobilePhone('en-US')
        .withMessage('Invalid phone number'),

    // Education validation
    body('education')
        .optional()
        .isArray()
        .withMessage('Education must be an array').default([]),
    body('education.*.institution')
        .notEmpty()
        .withMessage('Institution is required')
        .isString()
        .withMessage('Institution must be a string'),
    body('education.*.title')
        .notEmpty()
        .withMessage('Education title is required')
        .isString()
        .withMessage('Education title must be a string'),
    body('education.*.description')
        .optional()
        .isString()
        .withMessage('Education description must be a string'),
    body('education.*.startYear')
        .notEmpty()
        .withMessage('Start year is required')
        .isISO8601()
        .withMessage('Start year must be a valid date'),
    body('education.*.endYear')
        .notEmpty()
        .withMessage('End year is required')
        .isISO8601()
        .withMessage('End year must be a valid date'),

    // Experience validation
    body('experience')
        .optional()
        .isArray()
        .withMessage('Experience must be an array'),
    body('experience.*.organization')
        .notEmpty()
        .withMessage('Organization is required')
        .isString()
        .withMessage('Organization must be a string'),
    body('experience.*.position')
        .notEmpty()
        .withMessage('Position is required')
        .isString()
        .withMessage('Position must be a string'),
    body('experience.*.description')
        .optional()
        .isString()
        .withMessage('Experience description must be a string'),
    body('experience.*.startYear')
        .notEmpty()
        .withMessage('Start year is required')
        .isISO8601()
        .withMessage('Start year must be a valid date'),
    body('experience.*.endYear')
        .notEmpty()
        .withMessage('End year is required')
        .isISO8601()
        .withMessage('End year must be a valid date'),

    // Social links validation
    body('socialLinks')
        .optional()
        .isObject()
        .withMessage('Social links must be an object'),
    body('socialLinks.website')
        .optional()
        .isURL()
        .withMessage('Website must be a valid URL'),
    body('socialLinks.linkedin')
        .optional()
        .isURL()
        .withMessage('LinkedIn must be a valid URL'),
    body('socialLinks.twitter')
        .optional()
        .isURL()
        .withMessage('Twitter must be a valid URL'),
    body('socialLinks.facebook')
        .optional()
        .isURL()
        .withMessage('Facebook must be a valid URL'),
    body('socialLinks.instagram')
        .optional()
        .isURL()
        .withMessage('Instagram must be a valid URL'),
    body('socialLinks.whatsapp')
        .optional()
        .isString()
        .withMessage('WhatsApp must be a string'),
    body('socialLinks.youtube')
        .optional()
        .isURL()
        .withMessage('YouTube must be a valid URL'),
]