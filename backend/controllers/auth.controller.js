import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
export const signup = async (req, res) => {
     try {
        const {name, username, email, password} = req.body

        //checks: if user didnt give any input 
        if(!name || !username || !email || !password) return res.status(400).json({message: "Please provide all fields"})
      
        //checks: password length, username and email already exist
        const existingEmail = await User.findOne({email})
        if(existingEmail) return res.status(400).json({message: "Email already exists"})
        const existingUsername = await User.findOne({username})
        if(existingUsername) return res.status(400).json({message: "Username already exists"})
        if(password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"})
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
        const user = new User({
           name,
           email,
           password: hashedPassword,
           username
        })
        await user.save()

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.cookie("jwt-linkedin", token, {
            httpOnly: true, //XSS attack
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            sameSite: "strict", //prevent CSRF
            secure: process.env.NODE_ENV === "production" //man in middleattack
        })
        res.status(201).json({message: "User created successfully"})
       
       
        //todo: send verification email
        const profileUrl = process.env.CLIENT_URL+ "/profile/" +user.username
        try {
            await sendWelcomeEmail(user.email, user.name,profileUrl)
        } catch (error) {
            console.log("Error in sending welcome email: ", error)
        }


     } catch (error) {
        console.log("Error in signup: ", error)
        res.status(500).json({message: "Error creating user in Signup funtion"})
     }
};
export const login = async (req, res) => {
   try {
    const {username, password} = req.body
    //checks: if user didnt give any input
    if(!username || !password) return res.status(400).json({message: "Please provide all fields"})
    //checks: if user not exists
    const user = await User.findOne({username})
    if(!user) return res.status(400).json({message: "User not found"})

    //checks: if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message: "Invalid password"})

    //create token
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.cookie("jwt-linkedin", token, {
        httpOnly: true, //XSS attack
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        sameSite: "strict", //prevent CSRF
        secure: process.env.NODE_ENV === "production" //man in middleattack
    })
    res.status(200).json({message: "User logged in successfully"})

   } catch (error) {
    console.log("Error in login: ", error)
    res.status(500).json({message: "Error logging in user in Login function"})
   }  
};
export const logout = async (req, res) => {
  res.clearCookie("jwt-linkedin")
  res.status(200).json({message: "Logged out successfully"})
};
export const getCurrentUser = async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        console.log("Error in getCurrentUser: ", error)
        res.status(500).json({message: "Error getting current user"})
    }
}