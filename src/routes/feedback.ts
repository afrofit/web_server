import express from "express";

import {
  createFeedback,
  deleteFeedback,
  getAllClass,
  getFeedbackById,
  updateFeedback,
} from "../controllers/feedback";
import { fileUpload, isAdmin, isAuthenticated } from "../middleware";

const router = express.Router();

/**
 * Testimonials  APIs
 * */

router.get("/", getAllClass);

router.get("/:feedbackId", isAuthenticated, getFeedbackById);

router.post("/create", isAdmin, fileUpload.single("image"), createFeedback);

router.put("/:feedbackId", isAdmin, fileUpload.single("image"), updateFeedback);

router.delete("/:feedbackId", isAdmin, deleteFeedback);

export { router as feedbackRoutes };
