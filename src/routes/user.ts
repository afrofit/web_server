import express from "express";
import { createUser, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
// router.get("/:userId", getCurrentUser);
// router.post("/update/:userId", updateUser);

export { router as userRoutes };
