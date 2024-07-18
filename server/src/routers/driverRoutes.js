import express from 'express';
import multer from 'multer';
import { applyDriver } from '../controllers/driverControllers.js';
import { authMiddleware } from '../middleware/auth2.js';

const driverRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'doc-uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

driverRouter.post('/apply', authMiddleware, upload.fields([
  { name: 'driversLicense', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
]), applyDriver);

export default driverRouter;
