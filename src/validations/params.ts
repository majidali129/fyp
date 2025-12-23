import { param } from "express-validator";


export const paramsValidation = [
    param('id').notEmpty().withMessage('Missing parameter: id').isMongoId().withMessage('Invalid ID format. ID must be a valid Mongo ID.'),
];