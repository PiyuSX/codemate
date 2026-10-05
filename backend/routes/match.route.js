import express from "express"
import { findMatch, matchClear, matchReqClear } from "../controller/match.controller.js"
import { userAuth } from "../middleware/auth.middleware.js"


const router = express.Router()


router.post("/find",userAuth, findMatch)
router.post("/session-end",userAuth, matchClear)
router.post("/end-all", userAuth, matchReqClear)



export default router