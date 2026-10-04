import express from "express"

const router = express.Router()

import { findMatch, matchClear, matchReqClear } from "../controller/match.controller.js"

router.post("/find", findMatch)
router.post("/session-end", matchClear)
router.post("/end-all", matchReqClear)



export default router