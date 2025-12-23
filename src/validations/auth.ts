import { body } from "express-validator";



export const signUpValidation = [
    body('username').notEmpty().withMessage('Username is required.').isString().isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.'),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.'),
    body('password').notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('fullName').notEmpty().withMessage('Full name is required.').isString().isLength({ max: 100 }).withMessage('Full name must be less than 100 characters.'),
    body('role').optional().isIn(['student','instructor' , 'admin']).withMessage('Role must be either student, instructor, or admin.').default('student'),
]

export const signInValidation = [
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.'),
    body('password').notEmpty().withMessage('Password is required.'),
]