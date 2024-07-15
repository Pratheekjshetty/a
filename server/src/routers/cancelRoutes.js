import express from 'express';
import { cancelBooking } from '../controllers/cancelControllers.js';

const router = express.Router();

router.post('/cancel-booking', cancelBooking);

export default router;
