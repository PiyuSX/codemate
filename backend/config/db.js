import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB tada")
    } catch (error) {
        console.log("Error connect to MongoDB:", error)
    }
}

export default connectDB