import mongoose from "mongoose";
const adminModel={
    admin_name:{
        type:String,
        required:true,
    },
    admin_email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:[String],
        data:Buffer,
        required:true,
    },
}
let admin =null;

const initAdminModel=async()=>{
    try{
        if(admin)return admin;
        admin=mongoose.model("adminmodel",adminModel); //adminmodel table is created in database
        return admin;
    }
    catch(err){
        console.log(err);
        console.log("admin_model",err)
    }
}
export default initAdminModel; //if multiple function call it inside {}