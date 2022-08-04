import express from "express";
import { createUser } from "../controllers/user";

const router = express.Router();

router.post("/create", createUser);
// router.get("/:userId", getCurrentUser);
// router.post("/login", loginUser);
// router.post("/update/:userId", updateUser);

export { router as userRoutes };
