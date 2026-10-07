import express from "express"
import { findMatch, matchClear, matchReqClear, reset } from "../controller/match.controller.js"
import { userAuth } from "../middleware/auth.middleware.js"


const router = express.Router()


router.post("/find",userAuth, findMatch)
router.delete("/session-end",userAuth, matchClear)
router.delete("/end-all", userAuth, matchReqClear)
router.delete("/reset", userAuth, reset)



export default router


