import express from "express"
import { updateUser } from "../controller/user.controller.js"
import { userAuth } from "../middleware/auth.middleware.js"

const router = express.Router()

router.put("/update",userAuth ,updateUser)

export default router