import express from 'express'
import cors from 'cors'
import connectDB from './src/helper/db.js'
import carRouter from '../server/src/routers/carRoutes.js'
import userRouter from '../server/src/routers/userRoutes.js'
import 'dotenv/config'

//app config
const app=express()
const port=3005

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use('/api/car',carRouter)
app.use('/images',express.static('uploads'))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
