import { Router } from "express";
import authRoutes from './auth-routes'
import instructorProfileRoutes from './instructor-profile-routes'
import categoryRoutes from './category-routes'
import courseRoutes from './course-routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/instructor-profile', instructorProfileRoutes)
router.use('/categories', categoryRoutes)
router.use('/courses', courseRoutes)


export default router;