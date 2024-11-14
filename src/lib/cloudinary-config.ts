import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
    secure: true,
})



const verifyCloudinaryCredentials = async () => {
    if(!process.env.CLOUDINARY_CLOUD || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Environment variables not set')
    }
}

export {cloudinary, verifyCloudinaryCredentials}