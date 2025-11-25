import { promisify } from "util";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/caurse.model.js";
import { Lacture } from "../models/Lacture.model.js";
import { rm } from "fs"
import fs from "fs"
import { User } from "../models/user.model.js";

export const createCourse = TryCatch(async (req,res) => {
    const {title,description,category,createdBy,duration,price} = req.body

    const image = req.file;
    console.log("FILE => ", req.file);

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price
    })


    res.status(201).json({
        message:"Course Created Successfully"
    })
})


export const addLectures = TryCatch(
    async (req,res) => {
        const course = await Courses.findById(req.params.id)

        if(!course) return res.status(404).json({
            message: "No Caurse with this id",
        })

        const {title,description} = req.body

        const file = req.file
        const lacture = await Lacture.create({
            title,
            description,
            video: file?.path,
            course: course._id,
        })


        res.status(201).json({
            message: "Lectured Added",
            lacture,
        })
    }
)


const unlikeAsync = promisify(fs.unlink)
export const deleteLacture = TryCatch(async (req,res) => {
    const lecture = await Lacture.findById(req.params.id)
    rm(lecture.video,()=>{
        console.log("Video Lacture Deleted");
    })

    await lecture.deleteOne()

    res.json({message:"Lacture Deleted Successfully"})
})

export const deleteCourse = TryCatch(async (req,res) => {
    const course = await Courses.findById(req.params.id)


    const lectures = await Lacture.find({course: course._id})

    await Promise.all(
        lectures.map(async(lacture) => {
            await unlikeAsync(lacture.video)
            console.log("Video Deleted")
        })

    )

    rm(course.image,() => {
        console.log("image Deleted")
    })

    await Lacture.find({course: req.params.id}).deleteMany()

    await course.deleteOne()

    await User.updateMany({},{$pull:{subscription:req.params.id}})

    res.json({
        message:"Course Deleted",
    })
})


export const getAllStats = TryCatch(async (req,res) => {
    const totalCourses = (await Courses.find()).length

    const totalLectures = (await Lacture.find()).length
    const totalUser = (await User.find()).length
    const stats = {
        totalCourses,
        totalLectures,
        totalUser
    }

    res.json({
        stats
    })
})