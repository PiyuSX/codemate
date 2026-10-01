import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Signup User

const signupUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
          const usedUsername = await User.findOne({ username })

        if (usedUsername) {
            return res.status(400).json({ message: "Username already taken"})
        }

        const user = await User.findOne({ email }) 

        if(user) {
            return res.status(400).json({ message: "Email already registered Please login"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        const token = jwt.sign({ id: savedUser._id}, process.env.JWT_SECRET, { expiresIn: "7d"})


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error"})
    }
}

export { signupUser }