import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { generateCloudinarySignature } from "@/lib/generate-cloudinary-signature";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const mediaTypeSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Please provide media type for signature" }),
});

export async function POST(request: NextRequest) {
  try {
    //     const apiKey = process.env.CLOUDINARY_API_KEY!;
    // const cloudname = process.env.CLOUDINARY_CLOUD!;

    const data = await request.json();
    console.log("BOdy", data);

    const parsedMedia = mediaTypeSchema.safeParse(data);
    console.log("Parsed Data", parsedMedia);

    if (!parsedMedia.success) {
      return apiResponse({
        success: false,
        message: "Invalid media type",
        status: 400,
        error: formatErrors(parsedMedia.error),
      });
    }

    const sign = generateCloudinarySignature(parsedMedia.data.message);

    return apiResponse({
      message: "Signature generated successfully",
      status: 200,
      data: {
        signature: sign.signature,
        timestamp: sign.timestamp,
        cloudname: "majidali129",
        apiKey: "667862698992451",
      },
    });
  } catch (error) {
    return apiResponse({
      data: null,
      message: "Error while creating signature for cloudinary",
      status: 500,
    });
  }
}
