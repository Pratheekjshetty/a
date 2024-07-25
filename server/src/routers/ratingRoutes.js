import express from 'express'
import {addRating, getRatingsByCarId, getRatingById, updateRating} from '../controllers/ratingControllers.js'
import authMiddleware from "../middleware/auth.js"

const ratingRouter = express.Router();

ratingRouter.post('/add',authMiddleware,addRating);
ratingRouter.get('/car/:carId', getRatingsByCarId);
ratingRouter.get('/:id', getRatingById);
ratingRouter.put('/edit/:id', authMiddleware, updateRating);

export default ratingRouter;