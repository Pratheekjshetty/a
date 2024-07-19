import express from 'express';
import multer from 'multer';
import { applyDriver } from '../controllers/driverControllers.js';
import { authMiddleware } from '../middleware/auth2.js';

const driverRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

driverRouter.post('/apply', authMiddleware, upload.fields([
  { name: 'driversLicense', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
]), applyDriver);

export default driverRouter;
