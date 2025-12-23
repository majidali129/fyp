import { NextFunction, Request, Response } from "express";
import {validationResult} from "express-validator";
import { asyncHandler } from "./async-handler";
import { ApiError } from "./api-error";


export const validationError = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const formatedErros = errors.array().map(err => {
        if (err.type == 'field') {
            return {
                field: err.path,
                message: err.msg as string
            }
        } else {
            return err.msg as string;
        }
    })
    if (!errors.isEmpty()) {
        // const msg = errors.mapped();
        throw new ApiError( 400, `Validation Error: ${JSON.stringify(formatedErros)}`)
    }
}