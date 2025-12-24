import { config } from "@/config"
import { cloudinary } from "@/lib/cloudinary"

export const generateCloudinarySignature = (type: 'lecture' | 'profile' | 'trailer' | 'thumbnail') => {
    const timestamp = Math.round((new Date()).getTime() / 1000)

    let paramsToSign: any = { timestamp }
    
    if (type === 'lecture') {
        paramsToSign = {
            ...paramsToSign,
            resource_type: 'video',
            eager: "sp_sd/m3u8",
            folder: 'lms/curriculum',
            eager_async: true,
            // eager_notification_url: ""
        }
    } else if (type === 'trailer') {
        paramsToSign = {
            ...paramsToSign,
            resource_type: 'video',
            folder: 'lms/trailers',
            eager: "sp_sd/m3u8",
            eager_async: true,
            // eager_notification_url: ""
        }
    }else if (type === 'thumbnail') {
        paramsToSign = {
            ...paramsToSign,
            folder: 'lms/thumbnails',
        }
    }
    else if (type === 'profile') {
        paramsToSign = {
            ...paramsToSign,
            folder: 'lms/users',
        }
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, config.CLOUDINARY_API_SECRET)
    
    console.log('Signature', {signature, timestamp, cloudName: config.CLOUDINARY_CLOUD_NAME, apiKey: config.CLOUDINARY_API_KEY})

    return { signature, timestamp, cloudName: config.CLOUDINARY_CLOUD_NAME, apiKey: config.CLOUDINARY_API_KEY }
}

