import mongoose from "mongoose";

const availableSchema =new mongoose.Schema({
    caritem:{type:Object, required:true},
    startdate:{type:Date,required:true},
    enddate:{type:Date,required:true},
    status:{type:String, default:"Car Booked by Admin"},
    date:{type:Date, default:Date.now()},
})  

const availableModel = mongoose.models.available || mongoose.model("available",availableSchema);
export default availableModel;