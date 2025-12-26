import { addNewReview, deleteReview, editReview, getAllReviews, getReview } from "@/controllers/review-controllers";
import { authorize } from "@/middlewares/authorize";
import { verifyRequest } from "@/middlewares/verify-request";
import { Router } from "express";



const router = Router()

router.use(verifyRequest)

router.route('/').post(authorize(['student']), addNewReview).get(getAllReviews)

router.route('/:id').get(getReview).put(authorize(['student']), editReview).delete(authorize(['student']), deleteReview)



export default router;