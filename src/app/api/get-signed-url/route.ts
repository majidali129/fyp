import { formatErrors } from "@/helpers/parseErrors";
import { apiResponse } from "@/lib/apiResponse";
import { generateCloudinarySignature } from "@/lib/generate-cloudinary-signature";
import { ApiError } from "next/dist/server/api-utils";
import {NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const mediaTypeSchema = z.object({
    message: z.string().refine(val => val === '' || val === null, {message: ''})
})

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.CLOUDINARY_API_KEY!;
    const cloudname = process.env.CLOUDINARY_CLOUD!;
    const body = await request.json();
    const parsedMedia = mediaTypeSchema.safeParse(body.message);
    if(!parsedMedia.success) {
        return apiResponse({
            success: false,
            message: 'Invalid media type',
            status: 400,
            error: formatErrors(parsedMedia.error),
        });
    }

    const sign = generateCloudinarySignature(parsedMedia.data.message);

    return NextResponse.json({
        signature: sign.signature,
        timestamp: sign.timestamp,
        cloudname,
        apiKey
    }, {status: 200});
    } catch (error) {
        return apiResponse({
            data: null,
            message: 'Error while creating signature for cloudinary',
            status: 500,
        })
    }
}