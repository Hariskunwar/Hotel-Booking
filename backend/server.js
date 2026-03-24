import express from "express";
import "dotenv/config";
import cors from "cors";

const app=express();
app.use(cors());



const PORT=process.env.PORT||4000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
