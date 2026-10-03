import express from "express"
import { signupUser, loginUser, logoutUser, verifyPassword } from "../controller/auth.controller.js"
import { userAuth } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/verify-password", userAuth, verifyPassword)

export default router