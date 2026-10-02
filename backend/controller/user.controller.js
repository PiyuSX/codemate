import User  from "../models/user.model.js"
import bcrypt from "bcryptjs"

const updateUser = async (req, res) => {
    const { username, email, imgURL, password } = req.body
    const userId = req.userId
    
    try {
     const user = await User.findById(userId)
     if(!user) {
        return res.status(404).json({ message: "User not found"})
     }

    const usedUsername = await User.findOne({ username, _id: { $ne: userId } })
    if(usedUsername) {
        return res.status(400).json({ message: "Username already in use"})
    }

    const usedEmail = await User.findOne({ email,  _id: { $ne: userId } }) 
    if(usedEmail) {
        return res.status(400).json({ message: "Account with this email alrady exists "})
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password"})
    }


    user.username = username || user.username
    user.email = email || user.email
    user.imgURL = imgURL || user.imgURL

    const updatedUser = await user.save()

    return res.status(200).json({
        message: "User updated successfully",
        user: {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            imgURL: updatedUser.imgURL
        }
    })
    


    } catch (error) {
        console.log(error)
        return res.status (500).json({ message: "Internal server error"})
    }
}


export { updateUser } 