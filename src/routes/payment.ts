import express from "express";
import { createUser, loginUser } from "../controllers/user";

const router = express.Router();

// router.post("/create-stripe-session", createStripeSession);
// router.post("/login", loginUser);

export { router as paymentRoutes };
