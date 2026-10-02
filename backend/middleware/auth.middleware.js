import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
         const token = req.cookies.token
         if(!token) {
             return res.status(401).json({ message: "Sorry Mate you are not Authorized to do this"})
         }
        
         const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.id
        
        next()
         

     } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Sorry Mate you are not Authorized to do this"})
     }
}