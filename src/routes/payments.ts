import express from "express";
import { createStripeSession } from "../controllers/payments";
import { isAuthenticated, isCurrentUser } from "../middleware";

const router = express.Router();

router.post(
  "/create-stripe-session/:userId",
  //   [isAuthenticated, isCurrentUser],
  createStripeSession
);

export { router as paymentRoutes };
