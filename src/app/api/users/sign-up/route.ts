import sendEmailVerification from "@/helpers/sendEmailVerification";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import UserModel from "@/models/user.model";
import { registerUserSchema } from "@/schemas/registerUserSchema";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const userData = await request.json();
    const parsedData = registerUserSchema.safeParse(userData);
    console.log(parsedData);

    if (!parsedData.success) {
      const formatedError = parsedData.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message
      }));
      return NextResponse.json(
        {
          success: false,
          message: formatedError
        },
        { status: 400 }
      );
    }
    const { username, email, password } = parsedData.data;

    const existingUserByUsername = await UserModel.findOne({
      username,
      isVerified: true
    });

    if (existingUserByUsername) {
      return apiResponse({
        success: false,
        message: '"User already exist with this username',
        status: 400
      });
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return apiResponse({
          success: false,
          message: '"User already exist with this email',
          status: 400
        });
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;

        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const verifyCodeExpiry = new Date();
      verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

      const newUser = new UserModel({
        ...parsedData.data,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry
      });

      await newUser.save();
    }

    // SEND EMAIL TO USER
    const emailResponse = await sendEmailVerification({
      email,
      username,
      verifyCode,
      subject: "Email Verification Code"
    });

    if (!emailResponse.success) {
      return apiResponse({
        success: false,
        message: emailResponse.message,
        status: 500
      });
    }

    return apiResponse({
      message: "User registered successfully. please verify your email",
      status: 201
    });
  } catch (error) {
    console.log("Error registering user", error);

    return apiResponse({
      success: false,
      message: "Error registering user",
      status: 500
    });
  }
}
