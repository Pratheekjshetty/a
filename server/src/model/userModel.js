import mongoose, { Schema } from "mongoose";
const userModel={
    user_name:{
        type:String,
        required:true,
    },
    email:{
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
let user =null;

const initUserModel=async()=>{
    try{
        if(user) return user;
        user=mongoose.model("usermodel",userModel); //usermodel table is created in database
        return user;
    }
    catch(err){
        console.log(err);
        console.log("user_model",err)
    }
}
export default initUserModel; //if multiple function call it inside {}