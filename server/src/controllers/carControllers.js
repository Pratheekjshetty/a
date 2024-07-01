import carModel from '../models/carModels.js'
import fs from 'fs'
//add car
const addCar = async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    const car = new carModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        location:req.body.location,
        image:image_filename
    })
    try{
        await car.save();
        res.json({success:true,message:"Car Added"});
    } catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}
//list food
const listCar =async(req,res)=>{
    try{
        const cars=await carModel.find({});
        res.json({success:true,data:cars})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}
//remove food
const removeCar=async(req,res)=>{
    try{
        const car =await carModel.findById(req.body.id);
        fs.unlink(`uploads/${car.image}`,()=>{})
        await carModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Car Removed"})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}
export {addCar,listCar,removeCar}