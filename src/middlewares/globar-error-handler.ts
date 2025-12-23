
import { config } from '@/config';
import { ApiError } from '@/utils/api-error';
import { Prisma } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';

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
            errors: err.errors,
        });
    } else {
        
        console.error("ERROR 💥", err);
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
}

const handlePrismaValidationError = (err: any) => {
    const message = `Invalid input data. ${err.message}`;
    return new ApiError(400, message);
}

const handleJwtError = (statusCode: number, message: string) => new ApiError(statusCode, message);



export const globalErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.NODE_ENV === 'development') {
        sendDevError(err, res);
    } else if (config.NODE_ENV === 'production') { 
        let error: ApiError = err;
        
        // Handle JWT errors
        if (err instanceof ApiError && err.statusCode === 401) {
            error = handleJwtError(err.statusCode, err.message);
        }


        // Handle Prisma validation errors
        if (err instanceof Prisma.PrismaClientValidationError) {
            error = handlePrismaValidationError(err);
        }

        sendProdError(error, res);
    }
    }