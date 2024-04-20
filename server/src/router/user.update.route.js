import {Router} from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { changePassword, updateProfile } from "../controllers/user.controller.js"

const router =  Router()

router.route("/password").post(verifyJWT,changePassword)

router.route("/profile").post(verifyJWT,updateProfile)


export default router