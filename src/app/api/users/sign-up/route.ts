import sendEmail from "@/helpers/sendEmailVerification";
import { apiResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model";
import { registerUserSchema } from "@/schemas/registerUserSchema";
import { uploadFile } from "@/services/cloudinary-video-upload";
import bcryptjs from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);

    const parsedData = registerUserSchema.safeParse(formData);

    if (!parsedData.success) {
      console.log(parsedData.error.flatten());

      return apiResponse({
        success: false,
        message: "Invalid user data",
        status: 400,
        error: parsedData.error.flatten().fieldErrors,
      });
    }

    const { username, email, password, file } = parsedData.data;
    const existingUserByUsername = await User.findOne({
      username,
      isVerified: true,
    });

    if (existingUserByUsername) {
      return apiResponse({
        success: false,
        message: '"User already exist with this username',
        status: 400,
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return apiResponse({
          success: false,
          message: '"User already exist with this email',
          status: 400,
        });
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;

        await existingUserByEmail.save();

        return apiResponse({
          message: "User registered successfully. please verify your email",
          status: 201,
        });
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const verifyCodeExpiry = new Date();
      verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
      // upload profile photo to cloudinary
      const photo = await uploadFile(file, "profile-photos");

      // save user to DB;
      const user = new User({
        ...parsedData.data,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        profilePhoto: {
          public_id: photo.public_id,
          url: photo.url,
          secure_url: photo.secure_url,
        },
      });

      await user.save();
    }

    const emailResponse = await sendEmail({
      email,
      username,
      code: verifyCode,
      subject: "Email Verification Code",
    });

    if (!emailResponse.success) {
      return apiResponse({
        success: false,
        status: 500,
        message: emailResponse.message,
      });
    }

    return apiResponse({
      message: "User registered successfully. please verify your email.",
      status: 201,
    });
  } catch (error) {
    console.log("Error registering user", error);
    return apiResponse({
      success: false,
      message: "Error registering user",
      status: 500,
      error: error instanceof Error ? error.message : "Unknow Error",
    });
  }
}
