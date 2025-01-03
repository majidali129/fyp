import { cloudinary } from "./cloudinary-config";

const apiSecret = process.env.CLOUDINARY_API_SECRET!;
export const generateCloudinarySignature = (type: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Initialize eager as undefined
  let eager: string | undefined;

  switch (type) {
    case "lecture":
      eager = [
        // 480p
        "c_scale,w_640",
        // 720p
        "c_scale,w_1280",
        // 1080p
        "c_scale,w_1920",
      ].join("|");
      break;
    default:
      throw new Error("Invalid type for Cloudinary signature generation");
  }

  const signature = cloudinary.utils.api_sign_request(
    {
      ...(eager && { eager }), // Include eager only if defined
      timestamp,
    },
    apiSecret
  );

  return { timestamp, signature };
};
