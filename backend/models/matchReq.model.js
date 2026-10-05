import mongoose from "mongoose"

const matchReqSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    languages: {
        type: [String],
        required: true
    },

    status: {
        type: String,
        enum: ["searching", "matched"],
        default: "searching"
    }
}, { timestamps: true })

const MatchReq = mongoose.model("MatchReq", matchReqSchema)

export default MatchReq