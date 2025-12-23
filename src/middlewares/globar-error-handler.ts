
import { config } from '@/confit';
import { ApiError } from '@/utils/api-error';
import { Prisma } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import { JWTExpired, JWTInvalid } from 'jose/errors';

const sendDevError = (err: ApiError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
}
 
const sendProdError = (err: ApiError, res: Response) => { 
    if (err.isOperational) { 
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        
        console.error("ERROR 💥", err);
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
}

const handleValidationError = (err: any, res: Response) => {
    const message = `Invalid input data. ${err.message}`;
    return new ApiError(400, message);
 }

const handleJwtError = (statusCode: number, message: string) => new ApiError(statusCode, message);


const handleDuplicateFieldsDBError = (err: Prisma.PrismaClientKnownRequestError) => { 
    const target = err.meta?.target as string | string[];
    const message = `Duplicate field value: ${Array.isArray(target) ? target.join(", ") : target}. Please use another value!`;
    return new ApiError(400, message);
}


export const globalErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.NODE_ENV === 'development') {
        sendDevError(err, res);
    } else if (config.NODE_ENV === 'production') { 
        let error = { ...err, message: err.message, name: err.name };
        if (error instanceof ApiError) {
            // if(error.statusCode === 400 && error.message.includes('Validation Error')) {
            //     error = handleValidationError(error, res);
            // }
            if (error.statusCode === 401) {
                error = handleJwtError(error.statusCode, error.message);
            }
        };

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                error = handleDuplicateFieldsDBError(error);
            }
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            error = handleValidationError(error, res);
        }

        sendProdError(error, res);
    }
    
    // if (err instanceof ApiError) {
    //     if (err.statusCode === 400 && err.message.includes('Validation Error')) {
    //         const parsedErrors = JSON.parse(err.message.replace('Validation Error: ', '')) as string | { field: string; message: string }[];

    //         return res.status(err.statusCode).json({
    //             status: 'fail',
    //             message: 'Validation Error',
    //             errors: parsedErrors
    //         });
    //     }
    // }
    // console.error(`ERROR: ${err.message || 'Unknown Error'}`);
}