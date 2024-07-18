// import mongoose from "mongoose";

// const driverSchema =new mongoose.Schema({
//     userId:{type:String,required:true},
//     address:{type:Object, required:true},
//     adharnumber:{type:Number, required:true},
//     licencenumber:{type:Number, required:true},
//     expiredate:{type:Date,required:true},
//     experience:{type:String,required:true},
//     reference:{type:Number, required:true},
//     language:{type:String,required:true},
//     availability:{type:String,required:true},
//     driversLicense:{type:String,required:true},
//     proofOfAddress:{type:String,required:true},
//     status:{type:String, default:"Driver Applied"},
//     date:{type:Date, default:Date.now()},
// })

// const driverModel = mongoose.models.driver || mongoose.model("driver",driverSchema);
// export default driverModel;
// models/driverModels.js
// models/driverModels.js
// models/driverModels.js
// models/driverModels.js
import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  adharnumber: { type: Number, required: true },
  licencenumber: { type: Number, required: true },
  expiredate: { type: Date, required: true },
  experience: { type: String, required: true },
  reference: { type: Number, required: true },
  language: { type: String, required: true },
  availability: { type: String, required: true },
  driversLicense: { type: String, required: true },
  proofOfAddress: { type: String, required: true },
  status: { type: String, default: 'Driver Applied' },
  date: { type: Date, default: Date.now() },
});

const DriverModel =
  mongoose.models.Driver || mongoose.model('Driver', driverSchema);

export default DriverModel;
