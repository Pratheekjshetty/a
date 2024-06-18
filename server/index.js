import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./src/helper/databaseConnection.js";  //Add .js at last
import routes from "./routes.js";

const app= express();
dotenv.config();
const PORT =process.env.PORT || 3005;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
routes(app)
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
connectDB();

// console.log(PORT)
app.listen(PORT,()=>{
    console.log("server listening on port no:",PORT);
});
