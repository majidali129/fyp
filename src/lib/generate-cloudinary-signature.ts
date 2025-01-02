import { cloudinary } from "./cloudinary-config";


const apiSecret = process.env.CLOUDINARY_API_SECRET!;
export const generateCloudinarySignature = (type: 'lectures' | 'thumbnail' | 'trailer') => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Define eager transformations based on type
  let eager = '';
  let folder = '';

  switch (type) {
    case 'lectures':
      eager = [
        // 480p
        'c_scale,w_640',
        // 720p
        'c_scale,w_1280',
        // 1080p
        'c_scale,w_1920',
      ].join('|');
      folder = 'lectures';
      break;

    case 'thumbnail':
      eager = 'c_fill,w_300,h_300'; // Example for thumbnails (resize to 300x300)
      folder = 'thumbnails';
      break;

    case 'trailer':
      eager = 'c_scale,w_1280'; // Example for trailers (resize to 720p width)
      folder = 'trailers';
      break;

    default:
      throw new Error('Invalid type for Cloudinary signature generation');
  }

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      eager,
      folder,
    },
    apiSecret
  );

  return { timestamp, signature };
}
