import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import languageRoutes from "./routes/language.route.js"

dotenv.config()

const app = express()

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

app.get("/", (req, res) => {
    res.send("Hello from the backend!")
})

app.listen(PORT, ()=> {
    console.log(`Server is ready on port ${PORT}`)
})
