import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import languageRoutes from "./routes/language.route.js"
import matchRoutes from "./routes/match.route.js"
import { createServer } from "http"
import { Server } from "socket.io"
import callSocket from "./socket/call.socket.js"

dotenv.config()

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})
callSocket(io)

connectDB()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/languages", languageRoutes)
app.use("/api/match", matchRoutes)

app.get("/", (req, res) => {
    res.send("Hello from the backend!")
})

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
