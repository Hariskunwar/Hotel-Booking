import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app=express();
app.use(cors());
connectDb();
//middleware
app.use(express.json());
app.use(clerkMiddleware())

app.use('/api/clerk',clerkWebhooks)

app.get("/",(req,res)=>res.send("APi is working"));

const PORT=process.env.PORT||4000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
