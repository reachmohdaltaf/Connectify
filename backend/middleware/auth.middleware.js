import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
export const protectRoute = async (req, res, next) => {
   try {
    const token = req.cookies["jwt-linkedin"]
    if(!token){
        return res.status(401).json({message: "You are not authorized to access this route"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({message: "You are not authorized to access this route"})
    }
    const user = await User.findById(decoded.userId).select('-password')
    if(!user){
        return res.status(401).json({message: "You are not authorized to access this route"})
    }
    req.user = user
    next()
   } catch (error) {
    console.log("error in protects route", error)
    return res.status(401).json({message: "problem in protects route"})

   }
     
}