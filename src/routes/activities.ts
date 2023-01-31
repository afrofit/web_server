import express from "express";
import { getAllActivities } from "../controllers/activities";

import { isAdmin } from "../middleware";

const router = express.Router();

router.get("/", isAdmin, getAllActivities);

export { router as activitiesRoutes };
