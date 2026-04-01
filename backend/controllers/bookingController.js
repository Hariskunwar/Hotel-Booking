import Booking from "../models/Booking.js";
import Room from "../models/Room.js";


//check availability of rooms
const checkAvailability=async({checkInDate,checkOutDate,room})=>{
    try {
        const bookings=await Booking.find({
            room:room,
            checkInDate:{$lte:checkOutDate},
            checkOutDate:{$gte:checkInDate}
        });
        const isAvailable=bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.log(error.message);
        
    }
}

//api to check availability of rooms
export const checkRoomAvailability=async(req,res)=>{
    try {
        const {checkInDate,checkOutDate,room}=req.body;
        const isAvailable=await checkAvailability({checkInDate,checkOutDate,room});
        res.json({success:true,isAvailable}); 
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}


//create a new booking
export const createBooking=async(req,res)=>{
    try {
        const {room,checkInDate,checkOutDate,guests}=req.body;
        const isAvailable=await checkAvailability({checkInDate,checkOutDate,room});
        if(!isAvailable){
            return res.json({success:false,message:"Room is not available"});
        }
        //get total price
        const roomDetails=await Room.findById(room).pipulate("hotel");
        let totalPrice=roomDetails.pricePerNight;

        //calculate total price based on nights
        const checkIn=new Date(checkInDate);
        const checkOut=new Date(checkOutDate);
        const timeDiff=checkOut.getTime()-checkIn.getTime();
        const nights=Math.ceil(timeDiff/(1000*3600*24));
        totalPrice *=nights;
        const booking=await Booking.create({
            user:req.user._id,
            hotel:roomDetails.hotel._id,
            room,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests:+guests,
        
        });
        res.json({success:true,message:"Bookin created successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

export const getUserBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find({user:req.user._id}).populate("room hotel").sort({createdAt:-1});
        res.json({success:true,bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:"Failed to fetch bookings"});
    }
}

//get all bookings of a user
export const getHotelBookings=async (req,res)=>{
    try {
        const hotel=await Hotel.findOne({owner:req.user._id}); 
    if(!hotel){
        return res.json({success:false,message:"Hotel not found"});
    }
    const bookings=(await Booking.find({hotel:hotel._id}).populate("room user hotel")).sort({createdAt:-1});
    //total bookings
    const totalBookings=bookings.length;
    //total revenue
    const totalRevenue=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0);

    res.json({success:true,dashboarData:{totalBookings,totalRevenue,bookings}});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:"Failed to fetch bookings"});
    }

}