import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import { checkRoomAvailability, createBooking, getHotelBookings, getUserBookings } from "../controllers/bookingController.js";


const bookingRouter=express.Router();

bookingRouter.post("/check-availability",checkRoomAvailability);
bookingRouter.post('/book',protect,createBooking);
bookingRouter.get("/user",protect,getUserBookings);
bookingRouter.get("/hotel",protect,getHotelBookings);

export default bookingRouter;