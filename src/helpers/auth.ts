import { connectDB } from "@/lib/connectDB";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";

export const auth = async () => {
  await connectDB();
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken)
      throw new Error("You are not logged in! please log in to get access");

    const decodedToken = (await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    )) as JwtPayload;

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -__v"
    );
    if (!user) {
      throw new Error("User or Account no longer exist");
    }
    // validate access token expiry for one day

    const currentTime = new Date().getTime() / 1000;

    // if (Date.now() >= decodedToken.exp! * 1000) {
    if (currentTime >= decodedToken.exp!) {
      throw new Error(
        "Your access token has expired. Please log in again to get access"
      );
    }

    return {  token: accessToken, _id: user._id, username: user.username, role: user.role, user };
  } catch (error) {
    console.log("Error in authorization", error);
    throw new Error(error instanceof Error ? error.message : "Auth Error");
  }
};
