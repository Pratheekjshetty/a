import express from 'express'
import {addRating, getRatingsByCarId} from '../controllers/ratingControllers.js'
import authMiddleware from "../middleware/auth.js"

const ratingRouter = express.Router();

ratingRouter.post('/add',authMiddleware,addRating);
ratingRouter.get('/car/:carId', getRatingsByCarId);

export default ratingRouter;