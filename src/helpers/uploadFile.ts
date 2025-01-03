import axios from "axios";

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  url: string;
  secure_url: string;
  duration?: number;
  [key: string]: any;
}

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

interface SignedData {
  signature: string;
  timestamp: number;
  cloudname: string,
  apiKey: string,
}

const getSignature = async (mediaType: string) => {
  try {
    const signResponse = await axios.post("/api/get-signed-url", {message: mediaType});
    const signData = await signResponse.data

    console.log('SignData', signData);


    return signData;
  } catch (error) {
    console.log("Error while creating cloudinary signature", error);
    return null;
  }
};

export const uploadLecFile = async (file: File): Promise<TranscodedVideo | null> => {
  const formData = new FormData();
  try {
    const signData = await getSignature('lecture');

    if (!signData) {
      console.error("Failed to get Cloudinary signature. Aborting upload.");
      return null;
    }
    const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp", signData.timestamp.toString());
    formData.append("signature", signData.signature);
    formData.append("eager", "c_scale,w_640|c_scale,w_1280|c_scale,w_1920");
    formData.append("folder", "lectures");

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    const data = await res.json();
    // Parse response to extract transcoding URLs
    const { secure_url, playback_url, eager, public_id } = data;
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
  } catch (error) {
    console.log("Lec upload to cloudinary Error", error);
    // throw new Error("File upload failed. Please try again.");
    return null
  }
};

export const uploadFile = async (
  file: File,
  folder: string = "thumbnails"
): Promise<CloudinaryUploadResult | null> => {
  try {
    const mediaType = folder === "thumbnails"? 'thumbnail' : 'trailer';
    const signData = await getSignature(mediaType);

    console.log('SignedData', signData);

    if (!signData) {
      console.error("Failed to get Cloudinary signature. Aborting upload.");
      return null;
    }


    const formData = new FormData();
    const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;

    // Step 2: Prepare file upload
    formData.append("file", file);
    formData.append("api_key", signData.apiKey);
    formData.append("timestamp",  signData.timestamp.toString());
    formData.append("signature", signData.signature);
    formData.append("folder", folder);

    // Conditional transformations for video or image
    if (file.type.startsWith("video")) {
      formData.append("resource_type", "video");
      formData.append(
        "transformation",
        JSON.stringify([
          { quality: "auto", fetch_format: "mp4" },
          // Optional: trim to 30 seconds
          // { duration: "30", crop: "limit" },
        ])
      );
    } else {
      formData.append(
        "transformation",
        JSON.stringify([{ quality: "auto", fetch_format: "auto" }])
      );
    }

    // Step 3: Send file to Cloudinary
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // Step 4: Parse and return the response
    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Cloudinary upload failed for course file: ${error}`
      );
    }

    const result: CloudinaryUploadResult = await response.json();
    console.log("Uploaded File Data:", result);
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      url: result.url,
      bytes: result.bytes,
      ...(file.type.startsWith("video") && { duration: result.duration }),
    };
  } catch (error) {
    console.error("File Upload Error:", error);
    return null; // Return null in case of an error
  }
};
