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
