import mongoosse from "mongoose"

const matchReqSchema = new mongoosse.Schema({
    userId: {
        type: mongoosse.Schema.Types.ObjectId,
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