import { Router } from "express";
import authRoutes from './auth-routes'
import instructorProfileRoutes from './instructor-profile-routes'


const router = Router()

router.use('/auth', authRoutes)
router.use('/instructor-profile', instructorProfileRoutes)


export default router;