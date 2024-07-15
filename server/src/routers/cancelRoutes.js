import express from 'express';
import { cancelBooking ,getCancellations } from '../controllers/cancelControllers.js';

const router = express.Router();

router.post('/cancel-booking', cancelBooking);
router.get('/cancellations', getCancellations);

export default router;
