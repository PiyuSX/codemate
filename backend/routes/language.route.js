import express from "express"
import { getLanguages, updateUserLanguages } from "../controller/language.controller.js"
import { userAuth } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", getLanguages)
router.put("/update", userAuth, updateUserLanguages)

export default router