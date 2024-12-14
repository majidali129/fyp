import {
  cloudinary,
  verifyCloudinaryCredentials,
} from "@/lib/cloudinary-config";

export const dropFile = async (fileId: string) => {
  await verifyCloudinaryCredentials();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};
