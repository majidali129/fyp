import { ApiError } from '@/utils/api-error'
import multer, { MulterError } from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile-photos/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        // NOTE: For Images only
         if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new ApiError(400, 'Only image files are allowed!') as any, false);
  }
        cb(null, true)
    },
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
        files: 1
    }

})