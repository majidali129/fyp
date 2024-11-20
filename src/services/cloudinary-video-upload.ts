import {
  cloudinary,
  verifyCloudinaryCredentials,
} from "@/lib/cloudinary-config";

interface TranscodedVideo {
  public_id: string;
  original: string;
  playback_url: string;
  resolutions: Array<{
    resolution: string;
    url: string;
    secure_url: string;
    status: string;
  }>;
}

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export const uploadAndTranscodeVideo = async (
  file: File
): Promise<TranscodedVideo> => {
  await verifyCloudinaryCredentials();

  // Convert file to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload video
  const result = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "lectures",
        eager: [
          { width: 480, crop: "scale", format: "m3u8" }, // 480p HLS
          { width: 720, crop: "scale", format: "m3u8" }, // 720p HLS
          { width: 1080, crop: "scale", format: "m3u8" }, // 1080p HLS
        ],
        eager_async: true, // Ensure transcoding is asynchronous
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

  // Parse response to extract transcoding URLs
  const { secure_url, playback_url, eager , public_id} = result;
  const resolutions = eager.map((item: any) => ({
    resolution: item.url.includes("w_480")
      ? "480p"
      : item.url.includes("w_720")
      ? "720p"
      : "1080p",
    url: item.url,
    secure_url: item.secure_url,
    status: item.status,
  }));

  return {
    public_id,
    original: secure_url,
    playback_url,
    resolutions,
  };
};

/**
 * ! FOR NOW, IT IS ONLY FOR VIDEO HANDLING not FOR IMAGE
 */
export const uploadFile = async (
  file: File
): Promise<CloudinaryUploadResult> => {
  await verifyCloudinaryCredentials();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<CloudinaryUploadResult>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "video-uploads",
          transformation: [{ quality: "auto", fetch_format: "mp4" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
      uploadStream.end(buffer);
    }
  );

  return {
    public_id: result.public_id,
    bytes: result.bytes,
    duration: result.duration,
  };
};
