import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./config/db.js"


const app = express()

connectDB()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello from the backend!")
})

app.listen(PORT, ()=> {
    console.log(`Server is ready on port ${PORT}`)
})
