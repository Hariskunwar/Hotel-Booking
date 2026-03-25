import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import hotelRouter from "./routes/hotelRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoute.js";

const app=express();
app.use(cors());
connectDb();
connectCloudinary();
//middleware
app.use(express.json());
app.use(clerkMiddleware())

app.use('/api/clerk',clerkWebhooks)

app.get("/",(req,res)=>res.send("APi is working"));

app.use("/api/user",userRouter)
app.use("/api/user",hotelRouter)
app.use("/api/rooms",roomRouter);


const PORT=process.env.PORT||4000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
