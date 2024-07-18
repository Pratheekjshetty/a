import express from "express"
import authMiddleware1 from "../middleware/auth1.js"
import {applyDriver} from "../controllers/driverControllers.js"

const driverRouter = express.Router();

driverRouter.post("/apply",authMiddleware1,applyDriver);

export default driverRouter;