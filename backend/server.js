import express from "express"
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello from the backend!")
})

app.listen(PORT, ()=> {
    console.log(`Server is ready on port ${PORT}`)
})
