import express from "express"
import { updateUser,deleteUser  } from "../controller/user.controller.js"
import { userAuth } from "../middleware/auth.middleware.js"

const router = express.Router()

router.put("/update",userAuth ,updateUser)
router.delete("/delete", userAuth, deleteUser)

export default router

