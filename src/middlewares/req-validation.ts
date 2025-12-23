import { ApiError } from "@/utils/api-error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, _res: Response, next: NextFunction) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let formatedErrors: { msg: string; field?: string }[] = []

        formatedErrors = errors.array().map(err => {
            console.log('err',err)
            let error;
            if (err.type === 'field') {
                error = { msg: `${err.msg}`, field: err.path };
            }else error = { msg: `${err.msg}` };
            return error;
        })
        throw new ApiError(400, 'Validation Error', formatedErrors);
    }
    next()
}

