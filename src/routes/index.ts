import { Router } from "express";
import authRouter from './auth-routes'
import instructorProfileRouter from './instructor-profile-routes'
import categoryRouter from './category-routes'
import courseRouter from './course-routes'
import userRouter from './user-routes'
import cloudinarySignatureRouter from './cloudinary-signature'
import enrollmentRouter from './enrollment-routes'
import reviewRouter from './review-routes'
import lectureRouter from './lecture-routes'
import sectionRouter from './section-routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/instructor-profile', instructorProfileRouter)
router.use('/categories', categoryRouter)
router.use('/users', userRouter) // Still Pending
router.use('/enrollments', enrollmentRouter)
router.use('/courses', courseRouter)
router.use('/reviews', reviewRouter)
router.use('/lectures', lectureRouter)
router.use('/sections', sectionRouter)

// GENERAL ROUTE 
router.use('/signature', cloudinarySignatureRouter )


export default router;