import express from "express"
import { loginUser, myProfile, register, varifyUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post('/user/register',register)
router.post('/user/verify',varifyUser)
router.post('/user/login',loginUser)
router.get('/user/me',isAuth,myProfile);
 
export default router;