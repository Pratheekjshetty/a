// import express from "express"
// import authMiddleware2 from "../middleware/auth2.js"
// import {applyDriver} from "../controllers/driverControllers.js"

// const driverRouter = express.Router();

// driverRouter.post("/apply",authMiddleware2,applyDriver);

// export default driverRouter;
// routes/driverRoutes.js
// routes/driverRoutes.js
import express from 'express';
import multer from 'multer';
import { applyDriver } from '../controllers/driverControllers.js';
import { authMiddleware } from '../middleware/auth2.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/apply', authMiddleware, upload.fields([
  { name: 'driversLicense', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
]), applyDriver);

export default router;
