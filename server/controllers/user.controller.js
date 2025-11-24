import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

export const register = TryCatch(async (req,res) => {
    // res.send("Register")

        const {email,name,password} = req.body


        let user = await User.findOne({email});


        if(user) return res.status(400).json({
            message:"User Already Exist",
        })
        const hashPassword = await bcrypt.hash(password,10)
        user = {
            name,email,password:hashPassword
        }

        const otp = Math.floor(Math.random()*1000000)

        const activationToken = jwt.sign({
            user,otp
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn:'6m'
        }
    );
    const data = {
        name,otp,
    }
    await sendMail(
        email,
        "E Learning",
        data
    )

    res.status(200).json({
        message:"OTP send to your mail",
        activationToken,
    })

})


export const varifyUser = TryCatch(async(req,res) => {
    const {otp,activationToken} = req.body

    let verify;
    try {
        verify = jwt.verify(activationToken,process.env.ACTIVATION_SECRET)
    } catch (error) {
        return res.status(400).json({
            message: "OTP Expired",
        });
    }
    if(verify.otp.toString() !== otp.toString()) return res.status(400).json({
        message: "Wrong OTP",
    })

    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password :verify.user.password

        
    })
    res.json({
        message:"User Registered",
    })
})


export const loginUser = TryCatch(async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})
    if(!user) return res.status(400).json({
        message: "No user with this email",
    });

    const matchPassword = await bcrypt.compare(password,user.password)

    if(!matchPassword) return res.status(400).json({
        message: "Wrong Password",
    });

    const token = jwt.sign({_id:user._id}, process.env.JWT_SEC, {
        expiresIn: "15d"
    })

    res.json({
        message: `Welcome back${user.name}`,
        token,
        user,
    })
})

export const myProfile = TryCatch(async(req,res) => {
    const user = await User.findById(req.user._id)

    res.json({user})
})
