import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        //compass
        const url="mongodb://127.0.0.1:27017/internship_db";
        await mongoose.connect(url);
        //atlas
        //const url="mongodb+srv://Pratheek:1234@cluster0.wmfxfpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        //await mongoose.connect(url);
        console.log("Connected to DB");
    }
    catch(err){
        console.log(err);
        console.log("Error while Connecting to DB");
    }
};
export default connectDB;