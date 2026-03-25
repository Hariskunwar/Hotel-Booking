import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRoom, getOwnerRooms, getRooms, toogleRoomAvailability } from "../controllers/roomController.js";
import upload from "../middlewares/uploadMiddleware.js";



const roomRouter=express.Router();

roomRouter.post("/",upload.array("images",4),protect,createRoom);
roomRouter.get("/",getRooms)
roomRouter.get("/owner",protect,getOwnerRooms);
roomRouter.get("/toogle-availability",protect,toogleRoomAvailability)

export default roomRouter;