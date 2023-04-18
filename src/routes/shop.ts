import express from "express";

import {
  createShop,
  deleteShop,
  getAllShop,
  getShopById,
  updateShop,
} from "../controllers/shop";
import { fileUpload, isAdmin, isAuthenticated } from "../middleware";

const router = express.Router();

/**
 * Shop  APIs
 * */

router.get("/", isAuthenticated, getAllShop);

router.get("/:shopId", isAuthenticated, getShopById);

router.post("/create", isAdmin, fileUpload.array("files", 2), createShop);

router.put("/:shopId", isAdmin, fileUpload.array("files", 2), updateShop);

router.delete("/:shopId", isAdmin, deleteShop);

export { router as shopRoutes };
