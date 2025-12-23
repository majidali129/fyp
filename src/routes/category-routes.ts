import { addCategory } from "@/controllers/categorie-controllers";
import { authorize } from "@/middlewares/authorize";
import { verifyRequest } from "@/middlewares/verify-request";
import { Router } from "express";



const router = Router()

router.use(verifyRequest, authorize(['admin']))
router.post('/', addCategory)


export default router;