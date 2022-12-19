import express from "express";
import {
  createUser,
  getUserSubscription,
  loginUser,
  sendPasswordResetLink,
  setNewPassword,
  updateUserDp,
} from "../controllers/user";
import { fileUpload } from "../middleware";

const router = express.Router();

router.post("/create", fileUpload.single("image"), createUser);
router.post("/login", loginUser);
router.post("/update-dp/:userId", fileUpload.single("image"), updateUserDp);
router.post("/subscription/:userId", getUserSubscription);
router.post("/send-password-reset-link", sendPasswordResetLink);
router.post("/set-new-password/:userId", setNewPassword);

export { router as userRoutes };
