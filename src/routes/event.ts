import express from "express";

import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  updateEvent,
} from "../controllers/event";
import { fileUpload, isAdmin, isAuthenticated } from "../middleware";

const router = express.Router();

/**
 * Event  APIs
 * */

router.get("/", isAuthenticated, getAllEvent);

router.get("/:eventId", isAuthenticated, getEventById);

router.post("/create", isAdmin, fileUpload.array("files", 2), createEvent);

router.put("/:eventId", isAdmin, fileUpload.array("files", 2), updateEvent);

router.delete("/:eventId", isAdmin, deleteEvent);

export { router as eventRoutes };
