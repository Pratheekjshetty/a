import express from 'express'
import { addCar,listCar,removeCar,editCar} from '../controllers/carControllers.js'
import multer from 'multer'

const carRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

carRouter.post('/add',upload.single("image"),addCar)
carRouter.get('/list',listCar)
carRouter.post('/remove',removeCar)
carRouter.put('/edit',upload.single("image"),editCar)

export default carRouter;