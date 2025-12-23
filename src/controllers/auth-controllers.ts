import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwts";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'

type SignUpRequestBody = Pick<User, 'username' | 'email' | 'fullName' | 'password' | 'role'>
type SignInRequestBody = Pick<User, 'email' | 'password'>
export const registerUser = asyncHandler(async (req, res) => {
    const userData: SignUpRequestBody = req.body;

    const existingUserByEmail = await prisma.user.findUnique({ where: { email: userData.email } });
    
    if (existingUserByEmail) throw new ApiError(400, 'Email is already registered.');
    const existingUserByUsername = await prisma.user.findUnique({ where: { username: userData.username } });
    
    if (existingUserByUsername) throw new ApiError(400, 'Username is already taken.');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await prisma.user.create({data: userData, select: {id: true, username: true, email: true, fullName: true, role: true}});
    res.status(201).json({ message: 'User registered successfully', user: newUser });
})


export const loginUser = asyncHandler(async (req, res) => {
    const credentials: SignInRequestBody = req.body;

    const user = await prisma.user.findUnique({ where: { email: credentials.email } });
    if (!user) throw new ApiError(401, 'Invalid email or password.');
    
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) throw new ApiError(401, 'Invalid email or password.');

    // Generate tokens and set cookies here;
    const accessToken = await generateAccessToken({ userId: user.id, username: user.username, role: user.role });
    const refreshToken = await generateRefreshToken(user.id);

    res.cookie('access-token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    // Save refresh token in database
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    return apiResponse(res, 200, 'Login successful')
}
)


export const logoutUser = asyncHandler(async (req, res) => {
    // Clear cookies
    res.clearCookie('access-token', { path: '/' });
    res.clearCookie('refresh-token', { path: '/' });
    // Remove refresh token from database
    await prisma.user.update({
        where: { id: req.user.id },
        data: { refreshToken: null }
    })

    await apiResponse(res, 200, 'Logout successful');

})


export const getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true, email: true, fullName: true, role: true, image: true }
    });

    if (!user) throw new ApiError(404, 'User not found.');

    return apiResponse(res, 200, 'User fetched successfully', user);

})

