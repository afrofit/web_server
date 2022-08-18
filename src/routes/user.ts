import express from "express";
import {
  createUser,
  getUserSubscription,
  loginUser,
  updateUserDp,
} from "../controllers/user";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/update-dp/:userId", updateUserDp);
router.post("/subscription/:userId", getUserSubscription);

export { router as userRoutes };
