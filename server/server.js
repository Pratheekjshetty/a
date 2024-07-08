import express from 'express'
import cors from 'cors'
import connectDB from './src/helper/db.js'
import carRouter from '../server/src/routers/carRoutes.js'
import userRouter from '../server/src/routers/userRoutes.js'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app=express()
const port=4001

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use('/api/car',carRouter)
app.use('/images',express.static('uploads'))
app.use('/user-uploads', express.static(path.join(__dirname, 'user-uploads')))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
