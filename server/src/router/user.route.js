import {Router} from "express"
import accountRoute from "./account.route.js"
import updateUser from "./user.update.route.js"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"


const router  =  Router()


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(verifyJWT,logoutUser)

router.route("/current-user").get(verifyJWT,getCurrentUser)


// bypass update routes 

router.use("/update" , updateUser)

// bypass account route

router.use("/account" , accountRoute)

export default router