import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { addLectures, createCourse, deleteCourse, deleteLacture, getAllStats } from "../controllers/admin.controller.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", uploadFiles, isAuth, isAdmin, createCourse);

router.post("/course/:id",isAuth,isAdmin,uploadFiles,addLectures)
router.delete("/course/:id",isAuth,isAdmin,deleteCourse)
router.delete("/lacture/:id",isAuth,isAdmin,deleteLacture)
router.get("/stats",isAuth,isAdmin,getAllStats)


export default router;
