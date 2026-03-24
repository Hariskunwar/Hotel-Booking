import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from './config/db.js';

const app=express();
app.use(cors());
connectDb();


const PORT=process.env.PORT||4000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
