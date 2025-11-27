import express from "express"
import { fetchLecture, fetchLectures, getAllCources, getMyCources, getSingleCourse } from "../controllers/course.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all",getAllCources)

router.get("/course/:id",getSingleCourse)

router.get("/lectures/:id",isAuth,fetchLectures)
router.get("/lecture/:id",isAuth,fetchLecture)
router.get("/mycourse",isAuth,getMyCources)

export default router;