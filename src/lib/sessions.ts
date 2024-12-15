import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const decrypt = async (token: string): Promise<ITokenPayload> => {
  return (await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
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


  const payload = await decrypt(token as unknown as string);

  const user = await User.findById(payload.userId).select(
    "-password -refreshToken -__v"
  );
  return {...payload, user}
};

export const verifySession = async () => {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  return {
    isAuthenticated: true,
    userId: session.userId,
  };
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
};
