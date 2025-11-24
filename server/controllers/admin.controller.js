import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/caurse.model.js";
import { Lacture } from "../models/Lacture.model.js";
import { rm } from "fs"

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

export const deleteLacture = TryCatch(async (req,res) => {
    const lecture = await Lacture.findById(req.params.id)

    
})