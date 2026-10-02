
const updateUser = async (req, res) => {
    const { username, email, imgUrl } = req.body
    const userId = req.userId
    
    try {
     const user = await User.findById(userId)
     if(!user) {
        return res.status(404).json({ message: "User not found"})
     }

    const usedUsername = await User.findOne({ username })
    if(usedUsername) {
        return res.status(400).json({ message: "Username already in use"})
    }

    const usedEmail = await User.findOne({ email }) 
    if(usedEmail) {
        return res.status(400).json({ message: "Account with this email alrady exists "})
    }
    
    user.username = username || user.username
    user.email = email || user.email
    user.imgUrl = imgUrl || user.imgUrl

    const updatedUser = await user.save()

    return res.status(200).json({
        message: "User updated successfully",
        user: {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            imgUrl: updatedUser.imgUrl
        }
    })
    


    } catch (error) {
        console.log(error)
        return res.status (500).json({ message: "Internal server error"})
    }
}
