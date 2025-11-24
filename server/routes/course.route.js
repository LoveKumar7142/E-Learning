import express from "express"
import { fetchLecture, fetchLectures, getAllCources, getSingleCourse } from "../controllers/course.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all",getAllCources)

router.get("/course/:id",getSingleCourse)

router.get("/lectures/:id",isAuth,fetchLectures)
router.get("/lecture/:id",isAuth,fetchLecture)

export default router;