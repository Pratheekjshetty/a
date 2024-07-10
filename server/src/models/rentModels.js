import mongoose from "mongoose";

const rentSchema =new mongoose.Schema({
    userId:{type:String,required:true},
    car:{type:Object, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    pickupdate:{type:Date,required:true},
    dropoffdate:{type:Date,required:true},
    pickuptime:{type:Date,required:true},
    dropofftime:{type:Date,required:true},
    status:{type:String, default:"booked"},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false},
})

const rentModel = mongoose.models.rent || mongoose.model("rent",rentSchema);
export default rentModel;