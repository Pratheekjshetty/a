import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/helper/db.js'
import carRouter from '../server/src/routers/carRoutes.js'
import userRouter from '../server/src/routers/userRoutes.js'
import rentRouter from '../server/src/routers/rentRouters.js'
import cancelRouter from '../server/src/routers/cancelRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app=express();
const port=process.env.PORT || 4001;

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use('/images',express.static('uploads'))
app.use('/api/car',carRouter)
app.use('/user-uploads', express.static(path.join(__dirname, 'user-uploads')))
app.use("/api/user",userRouter)
app.use("/api/book",rentRouter)
app.use("/api/cancel",cancelRouter);


app.get("/",(req,res)=>{
    res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
