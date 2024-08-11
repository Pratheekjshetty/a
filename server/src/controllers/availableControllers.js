import availableModel from '../models/availableModels.js';
import carModel from '../models/carModels.js'; 

const availableBooking = async (req, res) => {
    try{
        const { carId} = req.body;
        const car = await carModel.findById(carId);
        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }
        const newAvailable =new availableModel({
            caritem:car,
            startdate:req.body.startDate,
            enddate:req.body.endDate,
        })
        await newAvailable.save();
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Available Booking Error" });
    }
};
const listadminBooking = async (req, res) => {

    try{
        const available=await availableModel.find({});
        res.json({success:true,data:available})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
};

export {availableBooking,listadminBooking};
