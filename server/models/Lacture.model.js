import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Caurses",
        required: true

    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

export const Lacture = mongoose.model("Lacture",schema)