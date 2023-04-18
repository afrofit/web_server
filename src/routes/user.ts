import express from "express";
import {
  createUser,
  getUserSubscription,
  loginUser,
  sendPasswordResetLink,
  setNewPassword,
  updateUserDp,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
  inviteUsers,
  dynamicUpdate,
  signOut,
} from "../controllers/user";
import { fileUpload, isAdmin, isAuthenticated } from "../middleware";

const router = express.Router();

router.get("/", isAdmin, getAllUser);
router.get("/:userId", isAuthenticated, getUser);

router.post("/create", fileUpload.single("image"), createUser);
router.post("/login", loginUser);
router.post("/update-dp/:userId", fileUpload.single("image"), updateUserDp);
router.post("/subscription/:userId", getUserSubscription);
router.post("/send-password-reset-link", sendPasswordResetLink);
router.post("/set-new-password/:userId", setNewPassword);
router.post("/inviteUsers", isAdmin, inviteUsers);
router.post("/dynamicUpdate", isAdmin, dynamicUpdate);
router.post("/signOut", isAuthenticated, signOut);

router.put("/:userId", isAdmin, fileUpload.single("image"), updateUser);

router.delete("/:userId", isAdmin, deleteUser);

export { router as userRoutes };
