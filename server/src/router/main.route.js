import userRoute from "./user.route.js"
import { getMessage } from "../controllers/main.controller.js";

import { Router } from "express";

const router =  Router()


// bypass user route ---

router.use("/user" ,userRoute)

// main routes

router.route("").get(getMessage)

export default router