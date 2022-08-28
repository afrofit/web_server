import express from "express";
import {
  createUser,
  getUserSubscription,
  loginUser,
  sendPasswordResetLink,
  setNewPassword,
  updateUserDp,
} from "../controllers/user";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/update-dp/:userId", updateUserDp);
router.post("/subscription/:userId", getUserSubscription);
router.post("/send-password-reset-link", sendPasswordResetLink);
router.post("/set-new-password/:userId", setNewPassword);

export { router as userRoutes };
