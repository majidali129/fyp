
import { ApiError } from '@/utils/api-error';
import { TokenPayload, verifyToken } from '@/utils/jwts';
import type { Request, Response, NextFunction } from 'express';
import { JWTExpired, JWTInvalid } from 'jose/errors';


export const verifyRequest = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies['access-token'];
        if (!token) {
            throw new ApiError(401, 'Unauthorized request: No access token found.');
    }
    
    try {
        const decodedToken = await verifyToken(token, 'access');
        const payload = decodedToken.payload as TokenPayload;
        req.user = {
            id: payload.userId,
            username: payload.username,
            role: payload.role
        };
        next();
    } catch (error) {
        console.log(`ERROR: ${error}`)
        if (error instanceof JWTInvalid) {
            throw new ApiError(401, 'Unauthorized request: Invalid access token.');
        } 
        if (error instanceof JWTExpired) {
            throw new ApiError(401, 'Unauthorized request: Access token has expired. Please log in again.');
        }
        next(error);
    }
}