import express from "express";

import { createNotification } from "../controllers/notification";
import { isAdmin, isAuthenticated } from "../middleware";

const router = express.Router();

/**
 * Notification  APIs
 * */

router.post("/create", isAdmin, createNotification);

export { router as notificationRoutes };
