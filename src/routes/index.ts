import { Router } from "express";
import authRoutes from './auth-routes'
import instructorProfileRoutes from './instructor-profile-routes'
import categoryRoutes from './category-routes'
import courseRoutes from './course-routes'
import userRoutes from './user-routes'
import cloudinarySignatureRoute from './cloudinary-signature'

const router = Router()

router.use('/auth', authRoutes)
router.use('/instructor-profile', instructorProfileRoutes)
router.use('/categories', categoryRoutes)
router.use('/courses', courseRoutes)
router.use('/users', userRoutes)

// GENERAL ROUTE 
router.use('/cloudinary', cloudinarySignatureRoute )


export default router;