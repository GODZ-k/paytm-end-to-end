import userRoute from "./user.route.js"
import { getUsers } from "../controllers/main.controller.js";

import { Router } from "express";

const router =  Router()


// bypass user route ---

router.use("/user" ,userRoute)

// main routes

router.route("/bulk").get(getUsers)

export default router