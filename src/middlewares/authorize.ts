import { ApiError } from "@/utils/api-error";
import type { Request, Response, NextFunction } from "express"


export const authorize = (roles: Array<'instructor' | 'student' | 'admin'>) => { 
    return async (req: Request, _res: Response, next: NextFunction) => { 
        if(!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(403, "Forbidden: You do not have permission to access this resource");
        }
        next();
    }
}