import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/caurse.model.js";
import { Lacture } from "../models/Lacture.model.js";
import { User } from "../models/user.model.js";

export const getAllCources = TryCatch(async (req,res) => {
    const courses = await Courses.find()

    res.json({
        courses,
    })
})


export const getSingleCourse = TryCatch(async (req,res) => {
    const course = await Courses.findById(req.params.id)
    res.json({
        course,
    })
})

export const fetchLectures = TryCatch(async (req,res) => {
    const lactures = await Lacture.find({course:req.params.id})


    const user = await User.findById(req.user._id)

    if(user.role === "admin") return res.json({lactures})

    if(!user.subscription.includes(req.params.id)) return res.status(400).json({
        message:"You have not subscribed to this course",

    })

    res.json({lactures})
})


export const fetchLecture = TryCatch(async (req,res) => {
    const lacture = await Lacture.findById(req.params.id)


    const user = await User.findById(req.user._id)

    if(user.role === "admin") return res.json({lacture})

    if(!user.subscription.includes(req.params.id)) return res.status(400).json({
        message:"You have not subscribed to this course",

    })

    res.json({lacture})
})


export const getMyCources = TryCatch(async (req,res) => {
    const courses = await Courses.find({id:req.user.subscription})

    res.json({
        courses,
    })
})


export const checkout = TryCatch(async (req,res) => {
    const user = await User.findById(req.user._id)

    const course = await Courses.findById(req.params.id)

    if(user.subscription.includes(course._id)){
        return res.status(400).json({
            message: "You already have this course"
        })
    }

    const options = {
        amount : Number(course.price * 100),
        currency: "INR"
    }

    const order = await instance.orders.create(options)
    
    res.status(201).json({
        order,
        course,
    })
})



export const paymentVerification = TryCatch(async (req,res) => {
    const {} = req.body;
})