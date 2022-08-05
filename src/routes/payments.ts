import express from "express";
import {
  createStripeSession,
  retrieveStripeSession,
} from "../controllers/payments";
import { isAuthenticated, isCurrentUser } from "../middleware";

const router = express.Router();

router.post(
  "/create-stripe-session/:userId",
  //   [isAuthenticated, isCurrentUser],
  createStripeSession
);
router.post(
  "/retrieve-stripe-session/:userId",
  //   [isAuthenticated, isCurrentUser],
  retrieveStripeSession
);

export { router as paymentRoutes };
