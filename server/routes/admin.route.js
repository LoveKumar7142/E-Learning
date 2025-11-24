import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { addLectures, createCourse } from "../controllers/admin.controller.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", uploadFiles, isAuth, isAdmin, createCourse);

router.post("/course/:id",isAuth,isAdmin,uploadFiles,addLectures)


export default router;
