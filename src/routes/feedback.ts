import express from "express";

import { createFeedback, getFeedback } from "../controllers/feedback";
import { fileUpload } from "../middleware";

const router = express.Router();

router.get("/", getFeedback);

router.post("/create", fileUpload.single("image"), createFeedback);

export { router as feedbackRoutes };
