import { config } from "@/confit"
import { jwtVerify, SignJWT } from "jose";

export type TokenPayload = {
    userId: string, 
    username: string, 
    role: 'instructor' | 'student' | 'admin'
}
export const generateAccessToken = async (payload: TokenPayload) => {
    const accessTokenKey = new TextEncoder().encode(config.ACCESS_TOKEN_SECRET);
    return await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime(config.ACCESS_TOKEN_EXPIRY).sign(accessTokenKey);
}

export const generateRefreshToken = async (userId: string) => {
    const refreshTokenKey = new TextEncoder().encode(config.REFRESH_TOKEN_SECRET);
    return await new SignJWT({userId}).setProtectedHeader({alg: "HS256"}).setExpirationTime(config.REFRESH_TOKEN_EXPIRY).sign(refreshTokenKey);
}


export const verifyToken = async (token: string, type: 'access' | 'refresh') => {
    const key = type === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;
    const secretKey = new TextEncoder().encode(key);
    return await jwtVerify(token, secretKey);
}
