import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiResponse } from "./apiResponse";
import { connectDB } from "./connectDB";
import mongoose from "mongoose";

interface ITokenPayload {
  username: string;
  role: string;
  userId: string;
}

const encrypt = async (
  payload: ITokenPayload,
  secret: string,
  expiry: string
): Promise<string> => {
  return jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
};

export const decrypt = async (token: string, secret: string): Promise<ITokenPayload> => {
  return (await jwt.verify(
    token,
    secret,
  )) as ITokenPayload;
};

export const generateAccessToken = async (payload: ITokenPayload) => {
  return await encrypt(
    payload,
    process.env.ACCESS_TOKEN_SECRET!,
    process.env.ACCESS_TOKEN_EXPIRY!
  );
};

export const generateRefreshToken = async (payload: ITokenPayload) => {
  return await encrypt(
    payload,
    process.env.REFRESH_TOKEN_SECRET!,
    process.env.REFRESH_TOKEN_EXPIRY!
  );
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;


  const payload = await decrypt(token as unknown as string, process.env.ACCESS_TOKEN_SECRET!);

  const user = await User.findById(payload.userId).select(
    "-password -refreshToken -__v"
  );
  return {...payload, user, token}
};

export const verifySession = async () => {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  return {
    isAuthenticated: true,
    userId: session.userId,
    token: session.token
  };
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
};


export const setAccessAndRefreshTokens = async (userId: string) => {
  await connectDB();

  try {
    const user = await User.findById({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (!user) throw new Error("User not found to geenerate tokens");
    const accessToken = await generateAccessToken(
      {
        username: user.username,
        role: user.role,
        userId: user._id as string,
    }
    );
    const refreshToken = await generateRefreshToken(
      {
        username: user.username,
        role: user.role,
        userId: user._id as string,
    }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(
      "Something went wrong while generating access refresh token",
      error
    );

    throw new Error(
      "Something went wrong while generating access refresh token"
    );
  }
};