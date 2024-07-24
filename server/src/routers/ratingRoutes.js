import express from 'express'
import {addRating} from '../controllers/ratingControllers.js'
import authMiddleware from "../middleware/auth.js"

const ratingRouter = express.Router();

ratingRouter.post('/add',authMiddleware,addRating);

export default ratingRouter;