import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/controllers/auth-controllers";
import { validate } from "@/middlewares/req-validation";
import { verifyRequest } from "@/middlewares/verify-request";
import { signInValidation, signUpValidation } from "@/validations/auth";
import { Router } from "express";


const router = Router()

router.post('/sign-up', signUpValidation, validate, registerUser);
router.post('/sign-in', signInValidation, validate, loginUser);
router.get('/me',verifyRequest, getCurrentUser)
router.post('/sign-out', verifyRequest, logoutUser);



export default router;