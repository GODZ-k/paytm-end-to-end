import { Router } from "express";
import { checkBalance, moneyTransfer } from "../controllers/account.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router()

router.route("/balance").get(verifyJWT,checkBalance)


router.route("/transfer").post(verifyJWT, moneyTransfer)

export default router