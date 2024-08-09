import mongoose from "mongoose";

const rentSchema =new mongoose.Schema({
    userId:{type:String,required:true},
    caritem:{type:Object, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    pickupdate:{type:Date,required:true},
    dropoffdate:{type:Date,required:true},
    pickuptime:{type:String,required:true},
    dropofftime:{type:String,required:true},
    status:{type:String, default:"Car Booked"},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false},
    unavailableDates: [{
        startDate: { type: Date },
        endDate: { type: Date },
    }]  
})  

const rentModel = mongoose.models.rent || mongoose.model("rent",rentSchema);
export default rentModel;