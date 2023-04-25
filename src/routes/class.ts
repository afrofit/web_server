import express from "express";

import {
  createClass,
  deleteClass,
  getAllClass,
  getClassById,
  updateClass,
} from "../controllers/class";
import { fileUpload, isAdmin, isAuthenticated } from "../middleware";

const router = express.Router();

/**
 * Class  APIs
 * */

router.get("/", isAuthenticated, getAllClass);

router.get("/:classId", isAuthenticated, getClassById);

router.post("/create", isAdmin, fileUpload.single("file"), createClass);

router.put("/:classId", isAdmin, fileUpload.single("file"), updateClass);

router.delete("/:classId", isAdmin, deleteClass);

export { router as classRoutes };
