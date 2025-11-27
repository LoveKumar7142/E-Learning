import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./database/db.js";
import razorpay from "razorpay"
dotenv.config()

export const instance = new Razorpay({
    key_id:process.env.RAZERPAY_TEST_API_KEY,
    key_secret:process.env.RAZERPAY_TEST_KEY_SECRET,
})

const app = express()


//using middlewares

app.use(express.json())

const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Server is started");
})


// importing routes
import userRoutes from "./routes/user.route.js"
import courseRoutes from "./routes/course.route.js"
import adminRoutes from "./routes/admin.route.js"
import Razorpay from "razorpay";


//using route

app.use("/api", userRoutes);
app.use("/api",courseRoutes)
app.use("/api",adminRoutes)



app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
    connectDb();
})