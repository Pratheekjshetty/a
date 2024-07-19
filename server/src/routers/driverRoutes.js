import express from 'express';
import multer from 'multer';
import { applyDriver, getApplications, updateApplicationStatus, deleteApplication } from '../controllers/driverControllers.js';
import { authMiddleware } from '../middleware/auth2.js';

const driverRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

driverRouter.post('/apply', authMiddleware, upload.fields([
  { name: 'driversLicense', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
]), applyDriver);
driverRouter.get('/applications',getApplications);
driverRouter.post('/update-role', updateApplicationStatus); 
driverRouter.delete('/delete-application', deleteApplication); 

export default driverRouter;
