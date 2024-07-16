import express from 'express';
import { cancelBooking, getCancellations, updateCancellationStatus } from '../controllers/cancelControllers.js';

const cancelRouter = express.Router();

cancelRouter.post('/cancel-booking', cancelBooking);
cancelRouter.get('/cancellations', getCancellations);
cancelRouter.post('/update-status', updateCancellationStatus);

export default cancelRouter;
