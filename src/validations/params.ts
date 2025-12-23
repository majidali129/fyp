import { body } from "express-validator";


export const paramsValidation = [
    body('id').notEmpty().withMessage('Missing parameter: id').isMongoId().withMessage('Invalid ID format. ID must be a valid Mongo ID.'),
];