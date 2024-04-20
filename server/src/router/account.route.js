import { Router } from "express";
import { checkBalance } from "../controllers/account.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/balance").get(verifyJWT,checkBalance)
export default router