import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        default: null
    },
    imgPublicId: {
        type: String,
        default: null
    },
    languages: {
        type: [String],
        enum: ["HTML", "CSS", "JavaScript", "Python"],
        default: []
    }
}, { timestamps: true})

const User = mongoose.model('User', userSchema)

export default User