import { uploadProfilePhoto } from "@/controllers/user-controllers";
import { upload } from "@/helpers/multer";
import { Router } from "express";



const router = Router()

router.post('/upload', upload.single('profilePhoto'), uploadProfilePhoto)

export default router;