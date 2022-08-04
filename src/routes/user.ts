import express from "express";
import { createUser, loginUser, updateUserDp } from "../controllers/user";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/update-dp/:userId", updateUserDp);
// router.post("/update/:userId", updateUser);

export { router as userRoutes };
