import express from "express";
import {
  getUserPerformanceData,
  getUserTodaysActivity,
} from "../controllers/performance";

const router = express.Router();

router.get("/overall/:userId", getUserPerformanceData);
router.get("/today/:userId", getUserTodaysActivity);
// router.post("/update/:userId", saveUserPerformance);

export { router as performanceRoutes };
