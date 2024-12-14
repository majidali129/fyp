import jwt from "jsonwebtoken";

export const generateAccessToken = async (userId: string, username: string, role: string) => {
  const token = jwt.sign(
    { _id: userId, username, role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! }
  );

  return token;
};

export const generateRefreshToken = async (
  userId: string,
  username: string,
  role: string
) => {
  const token = jwt.sign(
    { _id:userId, username, role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! }
  );

  return token;
};



