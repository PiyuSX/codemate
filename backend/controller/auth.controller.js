import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Signup User

const signupUser = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required"})
    }
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
                email: savedUser.email,
                imgURL: savedUser.imgURL,
                imgPublicId: savedUser.imgPublicId
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error"})
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        return res.status(400).json({ message: "All fields are required"})
    }

    try {
      const user = await User.findOne({ username })
      
      if(!user) {
        return res.status(400).json({ message: "Invalid username or password"})
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if(!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid username or password"})
      }

      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: "7d"})

      res.cookie("token", token,  {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      
      return res.status(200).json({
        message: "Login Successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            imgURL: user.imgURL,
            imgPublicId: user.imgPublicId
        }
      })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error"})
    }



}

const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })

    return res.status(200).json({message: "Logout Successful"})
}


const verifyPassword = async (req, res) => {
    const { password } = req.body
    const userId = req.userId

    try {
        const user = await User.findById(userId)
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        return res.status(200).json({ isPasswordCorrect })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error"})
    }
}


export { signupUser, loginUser, logoutUser,  verifyPassword }